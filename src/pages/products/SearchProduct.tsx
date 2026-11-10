import { useForm } from "react-hook-form";
import { useProductsStore } from "@/store/useProductsStore";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/IconField";
import { InputIcon } from "primereact/InputIcon";
import styles from "./ProductsPage.module.scss";

export default function SearchProduct() {
  const searchProduct = useProductsStore((state) => state.search);

  const { handleSubmit } = useForm({
    defaultValues: { q: "" },
  });

  const onSubmit = (data: { q: string }) => {
    searchProduct(data.q).then((t) => {
      console.log(t);

      return t;
    });
  };

  return (
    <div className="flex align-items-center justify-content-between pt-5 pb-5 pl-4 pr-4 mb-3 bg-white border-round-xl">
        <h3 className="flex-grow-1 w-3 m-0">Товары</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex-grow-2">
          <IconField iconPosition="left">
              <InputIcon className="pi pi-search"></InputIcon>
              <InputText
              placeholder="Найти"
              className={styles.search}
              />
          </IconField>
        </form>
        <div className="flex-grow-1 w-3"></div>
    </div>
  );
}
