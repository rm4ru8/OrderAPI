import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Order as Master } from "./order.entity";

@Entity("orders_detail")
export class OrdersDetail {

  static REPOSITORY = 'ORDERDETAILS_REPOSITORY';

  @ManyToOne(() => Master, (master:Master) => master.details)
  @JoinColumn({name: "flowkey"})
  @ApiProperty({description:'流程代碼',example:'1O1110218001'})
  @Column({primary: true})
  flowkey: string;

  @ApiProperty({description:'明細序號',example:'1'})
  @Column({primary: true})
  seqNo: number;

  @ApiProperty({description:'商品料號',example:'G021023'})
  @Column({length: 20})
  productcode: string;
  
    @ApiProperty({description:'商品名稱',example:'2022好運攏虎你福袋'})
    @Column({length: 50})
    productname: string;
  
  @ApiProperty({description:'商品批號',example:'G021023.SS'})
  @Column("varchar",{length: 30})
  batchno: string;

  @ApiProperty({description:'單位',example:'袋'})
  @Column({length: 10})
  unit: string;

  @ApiProperty({description:'數量',example:5})
  @Column("decimal", {
    precision: 8,
    scale: 0,
    default: () => "(0)",
  })
  qty: number;

  @ApiProperty({description:'單價',example:1000})
  @Column("decimal", {
    precision: 8,
    scale: 0,
    default: () => "(0)",
  })
  price: number;

  @ApiProperty({description:'金額',example:5000})
  @Column("decimal", {
    precision: 8,
    scale: 0,
    default: () => "(0)",
  })
  amount: number;
}
