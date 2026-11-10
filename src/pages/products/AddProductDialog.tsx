import { Dialog } from 'primereact/dialog';
import { useForm, Controller } from 'react-hook-form';
import { ProductModel } from '@/models/product.model';
import { useProductsStore } from '@/store/useProductsStore';
import { InputText } from 'primereact/inputtext';
import { errorHandler } from '@/services/form.service';
import { Button } from 'primereact/button';
import { use } from 'react';
import { ToastProvider } from '../../context/toast.ctx';

export interface IAddProductDialogProps {
    visible:boolean;
    setVisible:(visible:boolean)=>void;
}

export default function AddProductDialog({visible, setVisible}:IAddProductDialogProps) {
    const { showToast } = use(ToastProvider?.ToastCtx);
    const addProductToStore = useProductsStore(state=>state.add);

    const { handleSubmit,  control } = useForm({
        defaultValues: new ProductModel(),
    });
	const onSubmit = (data:ProductModel) => {
		addProductToStore(new ProductModel(data)).then(t=>{
            console.log(t)
            showToast({severity: 'success', summary: 'Успешно добавлен', detail: t.title + '  успешно добавлен'  })

            return t && setVisible(false)
    });
        
	};

    return (<>
        <Dialog header="Добавить продукт" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                        
                <Controller
                    name="title"
                    control={control}
                    rules={{ required: true}}
                    render={({ field, fieldState }) => (
                        <InputText 
                            {...field}
                            placeholder="Наименование"
                            {...errorHandler(fieldState)}  
                            className="w-full  mb-3"
                        />
                    )} 
                />
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: true}}
                    render={({ field, fieldState }) => (
                        <InputText 
                            {...field}
                            placeholder="Раздел"
                            {...errorHandler(fieldState)}  
                            className="w-full  mb-3"
                        />
                    )} 
                />
                <Controller
                    name="sku"
                    control={control}
                    rules={{ required: true}}
                    render={({ field, fieldState }) => (
                        <InputText 
                            {...field}
                            placeholder="Артикул"
                            {...errorHandler(fieldState)}  
                            className="w-full  mb-3"
                        />
                    )} 
                />
                <Controller
                    name="price"
                    control={control}
                    rules={{ required: true}}
                    render={({ field, fieldState }) => (
                        <InputText 
                            {...field}
                            placeholder="Цена"
                            {...errorHandler(fieldState)}  
                            className="w-full  mb-3"
                        />
                    )} 
                />

                <Button type='submit' label="Добавить" />
            </form>
        </Dialog>
    </>)
}
