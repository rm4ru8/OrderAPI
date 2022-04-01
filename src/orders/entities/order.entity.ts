import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany } from "typeorm";
import { OrdersDetail as Detail } from "./ordersdetail.entity";

@Entity("orders")
export class Order {

  static REPOSITORY = 'ORDER_REPOSITORY';

  @ApiProperty({description:'流程代碼:為系統碼+單號',example:'1O1110218001'})
  @Column("varchar",{primary: true, length: 50})
  flowkey: string;
  
  @ApiProperty({description:'系統碼:一律填寫 1',example:'1'})
  @Column("varchar",{length: 10})
  sysno: string;
  
  @ApiProperty({description:'訂單編號',example:'O1110218001'})
  @Column("varchar",{length: 40})
  code: string;

  @ApiProperty({description:'申請人',example:'林先生'})
  @Column("varchar",{length: 20})
  applicant: string;

  @ApiProperty({description:'部門:一侓填寫 B11(商品部)',example:'B11'})
  @Column("varchar",{length: 20})
  createdept: string;

  @ApiProperty({description:'訂單日期',example:'2022-04-01'})
  @Column("varchar",{length: 10})
  orderdate: string;

  @ApiProperty({description:'付款方式(P01:ATM轉帳, P02:超商繳款, P03:信用卡, P04:其他)',example:'P01'})
  @Column("varchar",{length: 20})
  payment: string;

  @ApiProperty({description:'客戶名稱',example:'林先生'})
  @Column("varchar",{length: 50})
  customer: string;

  @ApiProperty({description:'客戶連絡電話',example:'0987654321'})
  @Column({length: 20})
  telno: string;

  @ApiProperty({description:'收件人',example:'陳小姐'})
  @Column({length: 50})
  recipient: string;

  @ApiProperty({description:'收件連絡電話',example:'0987654322'})
  @Column({length: 20})
  contactno: string;

  @ApiProperty({description:'收件地址',example:'臺北市信義區松高路19號7樓'})
  @Column({length: 100})
  address: string;

  @ApiProperty({description:'備註',example:'到貨前請先電話連絡收件人'})
  @Column({length: 200})
  memo: string;

  @ApiProperty({description:'發票統編(發票如需開立統編則填入，無則空白)',example:'23525871'})
  @Column("varchar",{length: 10})
  vatno: string;

  @ApiProperty({description:'訂單總金額',example:'6980'})
  @Column("decimal", {
    precision: 8,
    scale: 0,
    default: () => "(0)",
  })
  totalamount: number;

  @ApiProperty({description:'訂單狀態(S01:已付款, S02:已出貨, S03:退貨, S04:已取消)',example:'S01'})
  @Column("varchar",{length: 20})
  orderstatus: string;

  @ApiProperty({
    description:'訂單明細資料',
    example:[
      {
        flowkey: "1O1110218001",
        seqNo: 1,
        productcode: "G021023",
        batchno: "G021023.SS",
        productname: "2022好運攏虎你福袋",
        unit: "袋",
        qty: 5,
        price: 1000,
        amount: 5000
      },
      {
        flowkey: "1O1110218001",
        seqNo: 2,
        productcode: "G021025",
        batchno: "G021025.SS",
        productname: "2022 HARRODS年度熊",
        unit: "隻",
        qty: 1,
        price: 1980,
        amount: 1980
      }
    ]
  })
  @OneToMany(
      () => Detail, 
      detail => detail.flowkey,
      {cascade: true}   // 關聯details用
  )
  details: Detail[];
}
