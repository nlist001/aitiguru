import { useEffect, useState } from "react";
import { useProductsStore } from "../../store/useProductsStore";
import { DataTable, type DataTableSelectionMultipleChangeEvent, type DataTableValueArray } from "primereact/datatable";
import { Column } from "primereact/column";
import styles from "./ProductsPage.module.scss";
import {currencyFormatter} from "@/utils/utils";
import type { IProduct } from "../../models/product.model";
import { Button } from "primereact/button";

export default function ProductsTable() {
  const fetchProductsToStore = useProductsStore(
    (state) => state.fetchProductsToStore,
  );
  const products = useProductsStore((state) => state.products);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [rowClick] = useState(true);
  const columns = [
    { field: "title", header: "Наименование" },
    { field: "category", header: "Раздел" },
    { field: "sku", header: "Артикул" },
    { field: "rating", header: "Оценка" },
    { field: "price", header: "Цена, ₽" },
  ];
  useEffect(() => {
    fetchProductsToStore();
  }, []);

  const titleTemplate = (rowData: IProduct) => {
    return (
      <div className="flex gap-3">
        <img src={rowData.thumbnail} className={styles.thumbnail} />
        <div>
          <h4 className="mt-0 mb-1">{rowData.title}</h4>
          <span className={styles.category}>{rowData.category}</span>
        </div>
      </div>
    );
  };
  const priceTemplate = (rowData: IProduct) => {
    const [f_part,s_part] = String(rowData.price).split('.');
      
      
    return (<>{currencyFormatter.format(Number(f_part))},<span>{s_part}</span></>);
  }
  

  const cellClass = (cellData: any) => {
    return cellData < 3 ? styles.lowRate : null;
  };
  const rowClass = (rowData: IProduct) => {
    return rowData.rating < 3 ? styles.lowRateRow : null;
  };

  return (
        <DataTable
          value={products}
          selectionMode={rowClick ? null : "checkbox"}
          selection={selectedProducts}
          rowClassName={rowClass}
          cellClassName={cellClass}
          onSelectionChange={(e:DataTableSelectionMultipleChangeEvent<DataTableValueArray>) => setSelectedProducts(e.value)}
          dataKey="id"
          tableStyle={{ minWidth: "50rem" }}
          className={styles.product_table}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>

          {columns.map((col) =>
            col.field == "title" ? (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                body={titleTemplate}
                 className={styles['column_'+col.field]}
              />
            ) :
             col.field == "price" ? (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                body={priceTemplate}
                 className={styles['column_'+col.field]}
              />
            ) : (
              <Column key={col.field} field={col.field} header={col.header} className={styles['column_'+col.field]} />
            ),
          )}
          <Column
                key="btn"
                header=""
                body={<Button icon="pi pi-plus" className={styles.btn_plus} size="small" />}
              />
          
        </DataTable>
  );
}
