import logo from "./assets/logo.png";
import { useState } from "react";
import { NewOrderCard } from "./components/newOrderCard";
import { OrderCard } from "./components/orderCard";

export function App() {
  const [shouldShowOnboardingNewOrder, setShouldShowOnboardingNewOrder] =
    useState<boolean>(false);

  function handleStartEditor() {
    setShouldShowOnboardingNewOrder((prev) => {
      return !prev;
    });
  }

  const [orderArray, setOrderArray] = useState<any>([]);

  function onOrderCreated(data: any) {
    setOrderArray((pre: any) => [...pre, data]);
    handleStartEditor();
  }

  return (
    <div className="mx-auto max-w-6x1 my-12 spacey-6 px-5">
      <div className="grid place-content-center mb-10">
        <img src={logo} alt="Logo" className="max-w-50" />
      </div>

      <div>
        <button
          onClick={handleStartEditor}
          className="w-full bg-indigo-600 rounded pt-3 p-2 my-2 text-zinc-50 font-medium"
        >
          Adicionar pedido
        </button>
      </div>

      {shouldShowOnboardingNewOrder && (
        <div className="grid gap-6">
          <div className="">
            <NewOrderCard sendData={onOrderCreated} />
          </div>
        </div>
      )}

      {orderArray.length > 0 ? (
        <OrderCard orderArray={orderArray} />
      ) : (
        <p className="text-slate-300 text-center my-10">
          Sem pedidos cadastrados
        </p>
      )}
    </div>
  );
}
