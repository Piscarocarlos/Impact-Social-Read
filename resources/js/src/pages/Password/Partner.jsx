import { useEffect,useState } from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import Logo from '../../assets/images/logo1.png'

const Partner = ({ token}) => {
  const { data, post, setData, processing, errors } = useForm({
    password:"",
    rePassword:"",
    id: token
  })
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const handleInputChange1 = (e) => {
    data.password=e.target.value
    setInputValue1(e.target.value);
    checkIfValuesMatch(e.target.value, inputValue2);
  };

  const handleInputChange2 = (e) => {
    data.rePassword=e.target.value
    setInputValue2(e.target.value);
    checkIfValuesMatch(inputValue1, e.target.value);
  };
 

  const checkIfValuesMatch = (value1,value2) => {
    if (value1 === value2) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    post('/update-password-partner');
   
  }

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
                <div className="flex items-center mb-10">
                    <div className="ltr:mr-4 rtl:ml-4">
                        <img src={Logo} className="w-16 h-16 object-cover rounded-full" alt="images" />
                    </div>
                    <div className="flex-3">
                        <h4 className="text-2xl">Modification de mot de passe</h4>
                        <p>Veuillez changer votre mot de passe</p>
                    </div>
                </div>
                <form className="space-y-5" onSubmit={submit}>
                    <div>
                        <label htmlFor="password">Mot de passe</label>
                        <input value={data.password} onChange={handleInputChange1} id="password" type="password" className="form-input" placeholder="Mot de passe" />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <div>
                        <label htmlFor="password">Confirmation</label>
                        <input value={data.rePassword} onChange={handleInputChange2} id="password" type="password" className="form-input" placeholder="Confirmation" />
                        {errors.rePassword && <div className="text-danger">{errors.rePassword}</div>}
                    </div>
                    <button type="submit"  disabled={isButtonDisabled} className="btn bg-lime-500 text-white border-lime-500 w-full">
                        Sauvegarder
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Partner;
