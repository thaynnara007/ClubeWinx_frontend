import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import api from '../../api/index';
import BasicForm from '../form/BasicForm/index';
import OneLineInput from '../input/oneLineInput/index';
import BaseButton from '../button/baseButton/index';

function Announcement({ announcementExists }) {
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
  const [number, setNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [complement, setComplement] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

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
    validateDescription() && validateExpense() && validateResidents() && validateVacancies();

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
    history.push('/homepage');
  };

  const getAddress = () => {
    api.get('/address/me').then((response) => {
      setStreet(response.data.street);
      setNumber(response.data.number);
      setDistrict(response.data.district);
      setZipCode(response.data.zipCode);
      setCity(response.data.city);
      setState(response.data.state);
    });
  };

  const getAnnouncement = () => {
    api.get('/user/poster/my').then((response) => {
      setDescription(response.data.description);
      setVacancies(response.data.vacancies);
      setExpense(response.data.expense);
      setResidents(response.data.residents);
      setStreet(response.data.owner.address.street);
      setComplement(response.data.owner.address.complement);
      setNumber(response.data.owner.address.number);
      setDistrict(response.data.owner.address.district);
      setZipCode(response.data.owner.address.zipCode);
      setCity(response.data.owner.address.city);
      setState(response.data.owner.address.state);
    });
  };

  useEffect(() => {
    console.log('EM ANNOUNCEMENT')
    if (announcementExists) {
      getAnnouncement();
    } else {
      getAddress();
    }
  }, []);

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
        <OneLineInput problem={problemResidents} name="Rua" value={street} onChange={() => {}} />
        <OneLineInput problem={problemResidents} name="Número" value={number} onChange={() => {}} />
        <OneLineInput
          problem={problemResidents}
          name="Bairro"
          value={district}
          onChange={() => {}}
        />
        <OneLineInput
          problem={problemResidents}
          name="Complemento"
          value={complement}
          onChange={() => {}}
        />
        <OneLineInput problem={problemResidents} name="CEP" value={zipCode} onChange={() => {}} />
        <OneLineInput problem={problemResidents} name="Cidade" value={city} onChange={() => {}} />
        <OneLineInput problem={problemResidents} name="Estado" value={state} onChange={() => {}} />
        <table>
          <tr>
            <td>
              <div>
                <BaseButton onClick={create}>SALVAR</BaseButton>
              </div>
            </td>
            <td>
              <div>
                <BaseButton danger onClick={cancel}>
                  CANCELAR
                </BaseButton>
              </div>
            </td>
          </tr>
        </table>
      </BasicForm>
    </div>
  );
}

export default Announcement;
