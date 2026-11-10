import { Card } from "primereact/card";
import { IconField } from "primereact/IconField";
import { InputIcon } from "primereact/InputIcon";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { LoginModel, type ILogin } from "@/models/auth.model";
import { errorHandler } from "@/services/form.service";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import styles from './LoginPage.module.scss';



export default function LoginPage() {
  const navigate = useNavigate();
  const [visiblityPass,setVisiblityPass] = useState(false);
  const loginAsync = useAuthStore((state) => state.loginAsync);
  const { handleSubmit, control, resetField } = useForm({
    defaultValues: new LoginModel(),
  });

  const onSubmit = (data: ILogin) => {
    loginAsync(data).then((t) => t && navigate("/"));
  };
	


  return (
    <div className="h-screen flex ">
      <div className={styles.logincard_wrapper}>
      <div className={styles.logincard}>
		<div className="flex flex-column align-items-center">
      <img src="/logo.png"></img>
      <div className={styles.greetings}>
        Добро пожаловать!
        <div>Пожалуйста, авторизуйтесь</div>
      </div>
		</div>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="flex flex-column gap-2">
              <label>Логин</label>
              <Controller
                name="username"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <IconField className="mb-3 p-icon-field-right" iconPosition="left">
                    <InputIcon className="pi pi-user"></InputIcon>
                    <InputText
                      {...field}
                      {...errorHandler(fieldState)}
                      className="w-full p-inputtext-lg"
                
                    />
                    <InputIcon className={"pi pi-times -ml-5 " + (field.value ? '' : 'hidden') } onClick={() => {resetField(field.name)}}  ></InputIcon>
                  </IconField>
                )}
              />
          </div>
          <div className="flex flex-column gap-2">
              <label>Пароль</label>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <IconField className="mb-3 p-icon-field-right" iconPosition="left">
                    <InputIcon className="pi pi-lock"></InputIcon>
                    <InputText
                      type={visiblityPass ? "text" : "password"}
                      {...field}
                      {...errorHandler(fieldState)}
                      className="w-full p-inputtext-lg"
                    />
                    <InputIcon onClick={()=>setVisiblityPass((state)=>!state)} className={'pi   ' + (visiblityPass ? 'pi-eye' : 'pi-eye-slash')}></InputIcon>
                  </IconField>
                )}
              />
          </div>


      
            <div className="flex align-items-center mb-3">
              <Controller
                name="keepme"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    inputId={field.name}
                    onChange={(e) => field.onChange(e.checked)}
                    checked={field.value}
                  />
                )}
              />
              <label htmlFor="keepme" className={"ml-2 " + styles.keepme}>
                Запомнить данные
              </label>
            </div>

            <Button type="submit" label="Войти" size="large" className="w-full" />
            
   
        </form>
      </div>
      </div>
    </div>
  );
}
