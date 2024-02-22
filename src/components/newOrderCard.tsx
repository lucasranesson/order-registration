import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, useState, useEffect } from "react";
import * as XLSX from "xlsx";

import { ProductList } from "./product";
import { InputText } from "./inputText";
import { ProductOrderType, ProductStockType } from "../types/types";
import { InputDate } from "./inputDate";

// Definindo o formato do meu objeto
interface SendDataProps {
  sendData: (data: any) => void;
}

export function NewOrderCard({ sendData }: SendDataProps) {
  const [inputClient, setInputClient] = useState<string>("");
  const [inputDeliveryDate, setInputDeliveryDate] = useState<string>("");
  const [orderProducts, setOrderProducts] = useState<any>([]);

  // Definindo um estado para buscar produtos
  const [searchProduct, setSearchProduct] = useState("");

  // // Estado que armazena os produtos
  const [xlsxFile, setXlsxFile] = useState<any>(() => {
    //   // Criando um estado apra armazenar no Storage info dos produtos
    const prodructsOnStorage = localStorage.getItem("products");

    if (prodructsOnStorage) {
      return JSON.parse(prodructsOnStorage);
    }

    return [];
  });

  useEffect(() => {
    const carregarArquivo = async () => {
      // Buscar o arquivo XLSX
      const response = await fetch("../../public/excel/products-list.xlsx");
      const data = await response.arrayBuffer();

      // Converter o conteúdo do arquivo para um workbook
      const workbook = XLSX.read(data, { type: "array" });

      // Acessando a primeira planilha
      const primeiraPlanilha = workbook.Sheets[workbook.SheetNames[0]];
      // console.log(primeiraPlanilha)

      setXlsxFile(XLSX.utils.sheet_to_json(primeiraPlanilha));
    };

    carregarArquivo();
  }, []);

  // Função que pesquisa produtos
  function handleSearchProduct(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearchProduct(query);
  }

  // Função que filtra a lista de produtos buscada
  const filteredProducts: ProductStockType[] =
    searchProduct != ""
      ? xlsxFile.filter((prod: any) =>
          prod.name
            .toLocaleLowerCase()
            .includes(searchProduct.toLocaleLowerCase())
        )
      : xlsxFile;

  const handleSaveOrder = () => {
    const newOrder = {
      // Gera um id único universal para cada posição
      order: crypto.randomUUID(),
      client: inputClient,
      deliveryDate: inputDeliveryDate,
      total: orderProducts.reduce(
        (acc: number, item: any) => acc + Number(item.price),
        0
      ),
      orderProducts,
    };
    sendData(newOrder);
  };

  return (
    <div className="bg-slate-800 p-2 my-2 rounded space-y-4">
      <p className="text-xl text-center font-bold text-zinc-50">
        Novo do pedido
      </p>
      <div className="h-px bg-slate-700"></div>

      <InputText
        value={inputClient}
        onChange={setInputClient}
        placeholder={"Cliente"}
      />

      <InputDate
        value={inputDeliveryDate}
        onChange={setInputDeliveryDate}
        placeholder={"Data de entrega"}
      />

      {orderProducts.map((order: ProductOrderType) => {
        return (
          <div className="p-2 rounded" key={order.id}>
            <div className="grid grid-cols-2">
              <div className="float-left">
                <p className="leading-6 text-gray-200 bg-transparent flex-1">
                  {order.name}{" "}
                </p>
                <p className="text-sm leading-6 text-gray-400 bg-transparent flex-1">
                  R$ {order.price}{" "}
                </p>
              </div>

              <div className="grid grid-cols-4 float-right">
                <p
                  className="text-sm leading-6 bg-slate-400 text-gray-100 text-center w-2/4 h-2/4 rounded-full flex-1"
                  // onClick={deleteQty({order.id}, )}
                >
                  -
                </p>
                <p className="text-sm leading-6 text-gray-100 text-center w-2/4 h-2/4 flex-1">
                  {order.qty}
                </p>
                <p className="text-sm leading-6 bg-slate-400 text-gray-100 text-center w-2/4 h-2/4 rounded-full flex-1">
                  +
                </p>
                <button
                  onClick={() => {
                    setOrderProducts((prev: any) => {
                      const newOrd = prev.filter(
                        (item: any) => item.id !== order.id
                      );
                      return newOrd;
                    });
                  }}
                  className="text-sm leading-6 bg-red-400 text-gray-100 text-center w-2/4 h-2/4 rounded-full flex-1 cursor-pointer"
                >
                  x
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <Dialog.Root>
        <Dialog.Trigger className="w-full bg-indigo-400 rounded pt-3 p-2 my-2 text-zinc-50 font-medium">
          Adicionar produto
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="inset-0 fixed bg-black/50" />
          <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto p-2 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
            <Dialog.Close className="absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
              <X className="size-5" />
            </Dialog.Close>
            <p className="text-xl text-center font-bold text-zinc-50 mt-3 mb-3">
              Adicionar produtos
            </p>
            <div className="h-px bg-slate-700"></div>

            <input
              type="text"
              placeholder="Pesquisar produto ..."
              className="w-full text-sm leading-6 bg-slate-900 p-2 rounded text-gray-100 mb-5"
              onChange={handleSearchProduct}
            />
            <div className="overflow-auto">
              {filteredProducts.map((filteredProd: ProductStockType) => {
                return (
                    <ProductList
                      key={filteredProd.id}
                      prod={filteredProd}
                      onChange={setOrderProducts}
                      orderProducts={orderProducts}
                    />
                );
              })}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <button
        type="button"
        onClick={handleSaveOrder}
        className="w-full bg-indigo-600 rounded pt-3 p-2 my-2 text-zinc-50 font-medium"
      >
        Finalizar pedido
      </button>
    </div>
  );
}
