import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface OrderProductListProps {
  productList: any;
  total: number;
}

export function OrderProductList({
  productList,
  total,
}: OrderProductListProps) {
  const isProductList = productList.map((productList: any, index:number) => (
    <tbody>
      <tr key={index}>
        <td className="border border-slate-500 px-4 py-2">{productList.qty}</td>
        <td className="border border-slate-500 px-4 py-2">
          {productList.name}
        </td>
        <td className="border border-slate-500 px-4 py-2">
          R$ {productList.price}
        </td>
      </tr>
    </tbody>
  ));
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="inset-0 fixed bg-black/50" />
      <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto p-2 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
        <Dialog.Close className="absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
          <X className="size-5" />
        </Dialog.Close>
        <p className="text-xl text-center font-bold text-zinc-50 mt-3 mb-3">
          Detalhes do pedido
        </p>
        <div className="h-px bg-slate-700"></div>
        <table className="table-fixed border-collapse border border-slate-500 rounded text-center">
          <thead className=" bg-slate-900">
            <tr>
              <th className="border border-slate-600 px-4 py-2">
                Qtd.
              </th>
              <th className="border border-slate-600 px-4 py-2">Produto</th>
              <th className="border border-slate-600 px-4 py-2">Preço</th>
            </tr>
            <tr></tr>
          </thead>
          {isProductList}
          <tfoot className=" bg-slate-900">
            <tr>
              <td colSpan={2} className="text-right">TOTAL</td>
              <td>{new Intl.NumberFormat("pt-BR").format(total)}</td>
            </tr>
          </tfoot>
        </table>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
