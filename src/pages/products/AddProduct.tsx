import { useState } from "react";
import { Button } from "primereact/button";
import styles from "./ProductsPage.module.scss";
import AddProductDialog from "./AddProductDialog";

export default function AddProduct() {

  const [visibleAddPop, setVisibleAddPop] = useState(false);

  return (<>
    <div className="flex justify-content-between mb-5 align-items-start">
      <h4 className={styles.head_all_position}>Все позиции</h4>
      <Button
        icon="pi pi-plus-circle"
        className={styles.add_button}
        onClick={() => setVisibleAddPop(true)}
        label="Добавить"
      />
    </div>
    <AddProductDialog
      visible={visibleAddPop}
      setVisible={setVisibleAddPop}
    ></AddProductDialog>
   
  </>);
}
