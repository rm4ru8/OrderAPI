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

  @Column({ primary: true, name: "flowkey", length: 50 })
  flowkey: string;

  @Column("decimal", { primary: true, name: "seq_no", precision: 8, scale: 0 })
  seqNo: number;

  @Column({ name: "productcode", length: 20 })
  productcode: string;

  @Column({ name: "productname", length: 50 })
  productname: string;

  @Column({ name: "unit", length: 10 })
  unit: string;

  @Column("decimal", {
    name: "qty",
    precision: 8,
    scale: 0,
    default: () => "(0)",
  })
  qty: number;

  @Column("decimal", {
    name: "price",
    precision: 8,
    scale: 0,
    default: () => "(0)",
  })
  price: number;

  @Column("decimal", {
    name: "amount",
    precision: 8,
    scale: 0,
    default: () => "(0)",
  })
  amount: number;
}
