import { useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';

import api from '../../../api';
import BasicForm from '../BasicForm';
import OneLineInput from '../../input/oneLineInput';
import BaseButton from '../../button/baseButton';
import { DATE_FORMAT } from '../../../utils/constants';
import { useHistory } from "react-router";

function Announcement() {
  const history = useHistory();

  const [expense, setExpense] = useState('');
  const [problemExpense, setProblemExpense] = useState(false);
  const [description, setDescription] = useState('');
  const [problemDescription, setProblemDescription] = useState(false);
  const [residents, setResidents] = useState('');
  const [problemResidents, setProblemResidents] = useState(false);
  const [vacancies, setVacancies] = useState('');
  const [problemVacancies, setProblemVacancies] = useState(false);

  const [street, setStreet] = useState('');
  const [problemStreet, setProblemStreet] = useState(false);
  const [number, setNumber] = useState('');
  const [problemNumber, setProblemNumber] = useState(false);
  const [district, setDistrict] = useState('');
  const [problemDistrict, setProblemDistrict] = useState(false);
  const [complement, setComplement] = useState('');
  const [problemComplement, setProblemComplement] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [problemZipCode, setProblemZipCode] = useState(false);
  const [city, setCity] = useState('');
  const [problemCity, setProblemCity] = useState(false);
  const [state, setState] = useState('');
  const [problemState, setProblemState] = useState(false);

  const validateExpense = () => {
    const validation = expense === '' || expense === null;
    setProblemExpense(validation);

    return !validation;
  };

  const validateDescription = () => {
    const validation = description === '' || description === null;
    setProblemDescription(validation);
    return !validation;
  };
  
  const validateResidents = () => {
    const validation = residents === '' || residents === null;
    setProblemResidents(validation);

    return !validation;
  };

  const validateVacancies = () => {
    const validation = vacancies === '' || vacancies === null;
    setProblemVacancies(validation);

    return !validation;
  };

  const validateInfo = () =>
    validateDescription() &&
    validateExpense() &&
    validateResidents() &&
    validateVacancies();

  const create = () => {
    const validated = validateInfo();

    if (validated) {
      const body = {
        expense,
        description,
        residents,
        vacancies,
      };

      api
        .post('/user/poster', body)
        .then(() => {
          toast('Anúncio criado com sucesso');
        })
        .catch((error) => {
          let msg = '';
          if (error.response) msg = error.response.data.error;
          else msg = 'Network failed';

          toast.error(msg);
        });
    }
  };

  const cancel = () => {
      history.push("/homepage");
  };

  const getAddressUser = () => {

    api
    .get('/address/me')
    .then((response) => {
      print(response.body);
    })
    
  };

  getAddressUser();

  
  return (
    <div style={{ marginTop: '150px' }}>
      <BasicForm>
      <OneLineInput
          problem={problemExpense}
          name="Valor: 286.89"
          value={expense}
          onChange={(value) => setExpense(value)}
        />
        <OneLineInput
          problem={problemDescription}
          name="Descrição"
          value={description}
          onChange={(value) => setDescription(value)}
        />
        <OneLineInput
          problem={problemResidents}
          name="Quantidade de moradores"
          value={residents}
          onChange={(value) => setResidents(value)}
        />
        <OneLineInput
          problem={problemVacancies}
          name="Quantidade de vagas"
          value={vacancies}
          onChange={(value) => setVacancies(value)}
        />
        <OneLineInput
          problem={problemResidents}
          name="Rua"
          value={vacancies}
          onChange={(value) => setResidents(value)}
        />
         <OneLineInput
          problem={problemResidents}
          name="Número"
          value={vacancies}
          onChange={(value) => setResidents(value)}
        />
        <OneLineInput
          problem={problemResidents}
          name="Bairro"
          value={vacancies}
          onChange={(value) => setResidents(value)}
        />
        <OneLineInput
          problem={problemResidents}
          name="Complemento"
          value={vacancies}
          onChange={(value) => setResidents(value)}
        />
        <OneLineInput
          problem={problemResidents}
          name="CEP"
          value={vacancies}
          onChange={(value) => setResidents(value)}
        />
        <OneLineInput
          problem={problemResidents}
          name="Cidade"
          value={vacancies}
          onChange={(value) => setResidents(value)}
        />
        <OneLineInput
          problem={problemResidents}
          name="Estado"
          value={vacancies}
          onChange={(value) => setResidents(value)}
        />
       
        <table>
          <tr>
          <td>
            <div>
              <BaseButton onClick={create}>ADICIONAR</BaseButton>
            </div>
          </td>
          <td>
            <div>
              <BaseButton danger={true} onClick={cancel}>CANCELAR</BaseButton>
            </div>
          </td>       
          </tr>
        </table>              
      </BasicForm>
    </div>
  );
}

export default Announcement;
