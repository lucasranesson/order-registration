import { Dispatch, SetStateAction } from "react";
import { ProductStockType } from "../types/types";

// // Tipagem da lista de produtos
interface ProductCardProps {
  prod: ProductStockType;
  onChange: Dispatch<SetStateAction<any>>;
  orderProducts: any;
}

export function ProductList({
  prod,
  onChange,
  orderProducts,
}: ProductCardProps) {
  const isButtonDisabled = orderProducts.filter((productSelected:any) => {
    if (productSelected.id === prod.id) return true;
    else return false;
  });

  return (
    <div className="flex w-full p-2 bg-slate-600 mb-1 rounded columns-1">
      <div className="w-4/6 flex-1">
        <p className="text-sm leading-6 text-gray-100">
          {prod.id} -{"  "}
          <span className="leading-6 text-gray-200 bg-transparent break-words">
            {prod.name}{"  "}
          </span>
          <span className="text-sm leading-6 text-indigo-100 bg-transparent">
            R$ {prod.price}{"  "}
          </span>
          <br></br>
          <span className="text-[12px] leading-6 text-gray-400 bg-transparent">
            Em estoque: {prod.qty_stock}{"  "}
          </span>
        </p>
      </div>
      <div className="w-2/6 flex-none text-right">
        {orderProducts.length > 0 && isButtonDisabled.length > 0 ? (
          <button
            type="button"
            className="bg-red-300 rounded pt-3 p-2 my-2 text-zinc-50 font-medium  "
            disabled
          >
            Já adicionado
          </button>
        ) : (
          <button
            type="button"
            className="bg-indigo-600 rounded pt-3 p-2 my-2 text-zinc-50 font-medium hover:bg-indigo-500 "
            onClick={() => {
              onChange((prev:any) => {
                return [
                  ...prev,
                  {
                    ...prod,
                    qty: 1,
                  },
                ];
              });
            }}
          >
            Adicionar
          </button>
        )}
      </div>
    </div>
  );
}
