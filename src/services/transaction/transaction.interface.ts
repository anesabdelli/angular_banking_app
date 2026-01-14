export interface EmitTransaction{
  emitTransaction(data : TransactionDto): Promise<TransactionResponse>
}

export interface TransactionDto{
  emitterAccountId : string
  receiverAccountId:	string
  //example: cfa510da-b18e-4391-81ca-f7cfb19697bd
  amount:	number
  //example: 50
  description:	string
  //example: Refund
}

export interface TransactionResponse{
   emitterAccountId : string
   receiverAccountId:	string
   amount:	number
   description:	string

}
