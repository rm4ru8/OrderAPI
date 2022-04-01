import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Order } from "./order.entity";

@Entity("orders_detail")
export class OrdersDetail {

  static REPOSITORY = 'ORDERDETAILS_REPOSITORY';

  @ManyToOne(
      () => Order, 
      (orders) => orders.details
    )
  @JoinColumn([{ name: "flowkey", referencedColumnName: "flowkey" }])
  master: Order;

  @ApiProperty({description:'流程代碼',example:'1O1110218001'})
  @Column({ primary: true, name: "flowkey", length: 50 })
  flowkey: string;

  @ApiProperty({description:'明細序號',example:'1'})
  @Column("decimal", { primary: true, name: "seq_no", precision: 8, scale: 0 })
  seqNo: number;

  @ApiProperty({description:'商品料號',example:'G021023'})
  @Column({ name: "productcode", length: 20 })
  productcode: string;
  
  @ApiProperty({description:'商品批號',example:'G021023.SS'})
  @Column({ name: "batchno", length: 20 })
  batchno: string;

  @ApiProperty({description:'商品名稱',example:'2022好運攏虎你福袋'})
  @Column({ name: "productname", length: 50 })
  productname: string;

  @ApiProperty({description:'單位',example:'袋'})
  @Column({ name: "unit", length: 10 })
  unit: string;

  @ApiProperty({description:'數量',example:'5'})
  @Column("decimal", {
    name: "qty",
    precision: 8,
    scale: 0,
    default: () => "(0)",
  })
  qty: number;

  @ApiProperty({description:'單價',example:'1000'})
  @Column("decimal", {
    name: "price",
    precision: 8,
    scale: 0,
    default: () => "(0)",
  })
  price: number;

  @ApiProperty({description:'金額',example:'5000'})
  @Column("decimal", {
    name: "amount",
    precision: 8,
    scale: 0,
    default: () => "(0)",
  })
  amount: number;
}
