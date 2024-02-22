import * as Dialog from "@radix-ui/react-dialog";
import { OrderProductList } from "./orderProductList"
import { ChangeEvent, useState } from "react";

interface OrderCard{
  orderArray: []
}

export function OrderCard({ orderArray }: OrderCard) {

  // Definindo um estado para buscar produtos
  const [searchOrder, setSearchOrder] = useState("");

      
  // Função que pesquisa produtos
  function handleSearchOrder(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearchOrder(query);
  }

  const filteredOrders:any = 
  searchOrder != ""
  ? orderArray.filter((order:any) =>
  order.client
  .toLocaleLowerCase()
  .includes(searchOrder.toLocaleLowerCase())
  )
  : orderArray;

    const orderCard = filteredOrders.map((orderProduct:any, index:number) => (
      <tbody className="bg-slate-800">
        <tr key={index} className="hover:bg-slate-500 cursor-pointer">
          <td className="border border-slate-700 px-4 py-2">
            {orderProduct.order}
          </td>
          <td className="border border-slate-700 px-4 py-2">{orderProduct.client}</td>
          <td className="border border-slate-700 px-4 py-2">{new Date(orderProduct.deliveryDate).toLocaleDateString()}</td>
          <td className="border border-slate-700 px-4 py-2">R$ {new Intl.NumberFormat('pt-BR').format(orderProduct.total)}</td>
          <td className="border border-slate-700 px-4 py-2">
          
            <Dialog.Root>
                <Dialog.Trigger className="w-full bg-indigo-400 rounded pt-3 p-2 my-2 text-zinc-50 font-medium">
                Ver produtos 🔎
                </Dialog.Trigger>
            
                <OrderProductList productList={orderProduct.orderProducts} total={orderProduct.total}/>
                
            </Dialog.Root>
            
            
          </td>
        </tr>
        </tbody>
      ))
    console.log(orderArray)
    return (
    <div className="grid gap-6">

        <form className="m-full">
          <input
            type="text"
            placeholder="Busque por pedidos ..."
            className="m-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-gray-500 mt-5"
            onChange={handleSearchOrder}
          />
        </form>
        <table className="table-auto border-collapse border border-slate-500 rounded text-center">
            <thead className=" bg-slate-700">
            <tr>
                <th className="border border-slate-600 px-4 py-2">ID</th>
                <th className="border border-slate-600 px-4 py-2">Nome</th>
                <th className="border border-slate-600 px-4 py-2">Data de Entrega</th>
                <th className="border border-slate-600 px-4 py-2">Total</th>
                <th className="border border-slate-600 px-4 py-2">&nbsp;</th>
            </tr>
            </thead>
            {orderCard}
            <tfoot className="bg-slate-700">
              <tr>
                <td colSpan={5}>&nbsp;</td>
              </tr>
            </tfoot>
        </table>
    </div>
    )
        
}