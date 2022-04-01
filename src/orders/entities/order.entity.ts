import { Column, Entity, OneToMany } from "typeorm";
import { OrdersDetail } from "./ordersdetail.entity";

@Entity("orders")
export class Order {

  static REPOSITORY = 'ORDER_REPOSITORY';

  @OneToMany(
      () => OrdersDetail, 
      (ordersDetail) => ordersDetail.master,
      {cascade: true}   // 關聯details用
    )
  details: OrdersDetail[];

  @Column({ primary: true, name: "flowkey", length: 50 })
  flowkey: string;

  @Column({ name: "sysno", length: 10 })
  sysno: string;

  @Column({ name: "code", length: 40 })
  code: string;

  @Column({ name: "applicant", length: 20 })
  applicant: string;

  @Column({ name: "createdept", length: 20 })
  createdept: string;

  @Column({ name: "orderdate", length: 10 })
  orderdate: string;

  @Column({ name: "payment", length: 20 })
  payment: string;

  @Column({ name: "customer", length: 50 })
  customer: string;

  @Column({ name: "telno", length: 20 })
  telno: string;

  @Column({ name: "recipient", length: 50 })
  recipient: string;

  @Column({ name: "contactno", length: 20 })
  contactno: string;

  @Column({ name: "address", length: 100 })
  address: string;

  @Column({ name: "memo", length: 200 })
  memo: string;

  @Column({ name: "vatno", length: 10 })
  vatno: string;

  @Column("decimal", {
    name: "totalamount",
    precision: 8,
    scale: 0,
    default: () => "(0)",
  })
  totalamount: number;

  @Column({ name: "orderstatus", length: 20 })
  orderstatus: string;
}
