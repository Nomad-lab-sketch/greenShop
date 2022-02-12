import React from 'react';
import s from './css/InfoForm.module.css';
import infoform1 from '../../images/content/infologo1.png';
import infoform2 from '../../images/content/infologo2.png';
import infoform3 from '../../images/content/infologo3.png';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/store';



const InfoForm: React.FC = () => {
    const infoList = (img: string, title: string, text: string) => {
        return (
            <li className={s.item}>
                <div className={s.image}>
                    <img src={img} alt="" className={s.img}/>
                </div>
                <div className={s.title}>
                    {title}
                </div>
                <div className={s.text}>
                    <p>
                        {text}
                    </p>
                </div>
            </li>
        )
    };

    const auth = useSelector((state: AppStateType) => state.loginCatalog.auth)

    if(auth === false){
        return <Redirect to={"/login"}/>
    }

    return (
        <div className={s.content}>
            <ul className={s.list}>
                {infoList(infoform1, 'Garden Care', 'We are an online plant shop offering a wide range of cheap and trendy plants.')}
                {infoList(infoform2, 'Plant Renovation', 'We are an online plant shop offering a wide range of cheap and trendy plants.')}
                {infoList(infoform3, 'Watering Graden', 'We are an online plant shop offering a wide range of cheap and trendy plants.')}
            </ul>
            <div className={s.form}>
                <div className={s.form__title}>
                    Would you like to join newsletters?
                </div>
                <form className={s.form__elem}>
                    <div className={s.form__input}>
                        <div className={s.form__input_element}>
                            <input type="email" className={s.form__input_elem}
                                   placeholder="enter your email address..."/>
                        </div>
                        <div className={s.form__button}>
                            <button className={s.btn}>
                                Join
                            </button>
                        </div>
                    </div>
                </form>
                <div className={s.form__text}>
                    <p>
                        We usually post offers and challenges in newsletter. We’re your online houseplant destination.
                        We offer a wide range of houseplants and accessories shipped directly from our (green)house to
                        yours!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default InfoForm;