
import ProductsTable from "./ProductsTable";
import AddProduct from "./AddProduct";
import SearchProduct from "./SearchProduct";
import ProductsTablePaginator from "./ProductsTablePaginator";

export default function ProductsPage() {
 

  return (
    <div >
        <SearchProduct></SearchProduct>
        <div className=" p-4 bg-white border-round-xl">
            <AddProduct></AddProduct>
            <ProductsTable></ProductsTable>
            <ProductsTablePaginator></ProductsTablePaginator>
        </div>
    </div>
  );
}
