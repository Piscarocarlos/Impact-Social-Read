import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { usePage } from '@inertiajs/inertia-react';
import ScoringValue from './components/ScoringValue';
import ScoringChampOpen from './components/ScoringChampOpen';

const Create = ({ fieldClose, fieldOpen, idChamp, cities, ecoles, situation__socials, filiere_bacs, logements, orphelinats, pays, provinces, regions, information__pluses, handicapType, champScoring }) => {
  const submit = (e) => {
    e.preventDefault();
    console.log(data)
    // post(route('dashboard.store.candidate'), {});
  }
  const { props } = usePage();
  const [dataValue, setDataValue] = useState();
  const [title, setTitle] = useState();
  const id = +idChamp;
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState(cities);
  const [province, setProvince] = useState(provinces);
  const [citySchool, setCitySchool] = useState(cities);
  const [regionSchool, setRegionSchool] = useState(regions);
  const [provinceSchool, setProvinceSchool] = useState(provinces);
  const [info, setInfo] = useState(information__pluses);
  const [dataChampScoring, setDataChampScoring] = useState(champScoring)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Create'));

  });
  const [active, setActive] = useState(1);
  const togglePara = (value) => {
    setActive((oldValue) => {
      return oldValue === value ? 0 : value;
    });
  };
  const formatData = (datavl) => {
    const obj = {};
    datavl?.forEach((item) => {

      obj[item.id] = null;
    })
    return obj;
  }
  const getNameChampScoring = (data) => {
    const obj = (data.filter((item) => (item.id === id
    ))).map((item) => item.value)

    return obj[0]
  }
  const getNameFieldScoring = (data) => {
    const obj = (data.filter((item) => (item.id === id
    ))).map((item) => item.name)

    return obj[0]
  }
  const getTypeChampScoring = (data) => {
    const obj = (data.filter((item) => (item.id === id
    ))).map((item) => item.type)

    return obj[0]
  }
  const titleField = getNameFieldScoring(dataChampScoring)

  const dataYear = [
    { "id": 1, "name": "2020", "status": true },
    { "id": 2, "name": "2021", "status": true },
    { "id": 3, "name": "2022", "status": true },
    { "id": 4, "name": "2023", "status": true },

  ]
  const dataHandicapPercentage = [
    { "id": 1, "name": "25%", "status": true },
    { "id": 2, "name": "50%", "status": true },
    { "id": 3, "name": "75%", "status": true },
    { "id": 4, "name": "100%", "status": true },

  ]
  const dataParentalCare = [
    { "id": 1, "name": "Mon pére", "value": "Mon pere", "status": true },
    { "id": 2, "name": "Ma mére", "value": "Ma mere", "status": true },
  ]
  const dataBankFather = [
    { "id": 1, "name": "Oui", "value": "yes", "status": true },
    { "id": 2, "name": "Non", "value": "no", "status": true },
  ]
  const dataBankMother = [
    { "id": 1, "name": "Oui", "value": "trueFB", "status": true },
    { "id": 2, "name": "Non", "value": "falseFB", "status": true },
  ]
  const dataHandicapSituation = [
    { "id": 1, "name": "Oui", "value": "trueMB", "status": true },
    { "id": 2, "name": "Non", "value": "falseMB", "status": true },
  ]
  const dataGenre = [
    { "id": 1, "name": "Masculin", "status": true },
    { "id": 2, "name": "Féminin", "status": true },
  ]
  const dataEPS = [
    { "id": 1, "name": "Oui", "value": "Oui", "status": true },
    { "id": 2, "name": "Non", "value": "Nom", "status": true },
  ]
  const dataWorkFather = [
    { "id": 1, "name": "Oui", "value": "trueF", "status": true },
    { "id": 2, "name": "Non", "value": "falseF", "status": true },
    { "id": 3, "name": "Retraité", "value": "retraite", "status": true },

  ]
  const dataWorkMother = [
    { "id": 1, "name": "Oui", "value": "trueM", "status": true },
    { "id": 2, "name": "Non", "value": "falseM", "status": true },
    { "id": 3, "name": "Retraité", "value": "retraiteM", "status": true },
  ]
  useEffect(() => {
    const fetchData = async () => {
      // if (getNameChampScoring(dataChampScoring)==='region') {
      //   setDataValue(regions)
      //   setTitle('region')
      // }else if (getNameChampScoring(dataChampScoring)==='province') {
      //   setDataValue(provinces)
      //   setTitle('province')

      // }else if (getNameChampScoring(dataChampScoring)==='city') {
      //   setDataValue(cities)
      //   setTitle('ville')
      // }else
      if (getNameChampScoring(dataChampScoring) === 'socialSituation') {
        setDataValue(situation__socials)
        setTitle('situation social')

      } else if (getNameChampScoring(dataChampScoring) === 'housing') {
        setDataValue(logements)
        setTitle('logement')

      } else if (getNameChampScoring(dataChampScoring) === 'orphelinType') {
        setDataValue(orphelinats)
        setTitle('orphelin')

      } else if (getNameChampScoring(dataChampScoring) === 'handicapType') {
        setDataValue(handicapType)
        setTitle("type d'handicap")

      } else if (getNameChampScoring(dataChampScoring) === 'bacStream') {
        setDataValue(filiere_bacs)
        setTitle("filiére du bac")

      } else if (getNameChampScoring(dataChampScoring) === 'schoolName') {
        setDataValue(ecoles)
        setTitle("lycée")

      } else if (getNameChampScoring(dataChampScoring) === 'handicapSituation') {
        setDataValue(dataHandicapSituation)
        setTitle("Situation d'handicap")

      } else if (getNameChampScoring(dataChampScoring) === 'parentalCare') {
        setDataValue(dataParentalCare)
        setTitle("Prise en charge par le parent")

      } else if (getNameChampScoring(dataChampScoring) === 'handicapPercentage') {
        setDataValue(dataHandicapPercentage)
        setTitle("Pourcentage d'handicap")

      } else if (getNameChampScoring(dataChampScoring) === 'workSituationFather') {
        setDataValue(dataWorkFather)
        setTitle("Votre pére travail")

      } else if (getNameChampScoring(dataChampScoring) === 'workSituationMother') {
        setDataValue(dataWorkMother)
        setTitle("Votre pére travail")

      } else if (getNameChampScoring(dataChampScoring) === 'genre') {
        setDataValue(dataGenre)
        setTitle("genre")

      } else if (getNameChampScoring(dataChampScoring) === 'supportByAnEPS') {
        setDataValue(dataEPS)
        setTitle("Prise en charge par un EPS")

      }
      else if (getNameChampScoring(dataChampScoring) === 'situationBankFather') {
        setDataValue(dataBankFather)
        setTitle("Situation bancaire du pére")

      } else if (getNameChampScoring(dataChampScoring) === 'situationBankMother') {
        setDataValue(dataBankMother)
        setTitle("Situation bancaire du mére")

      } else if (getNameChampScoring(dataChampScoring) === 'yearBac') {
        setDataValue(dataYear)
        setTitle("Année du bac")

      } else if (getNameChampScoring(dataChampScoring) === 'fundationInfo') {
        setDataValue(information__pluses)
        setTitle("Comment avez vous connu JADARA FOOUNDATION")

      }
    }
    fetchData();
  }, [])

  return (
    <DefaultLayout>

      {getTypeChampScoring(dataChampScoring) ? <ScoringValue dataValue={dataValue} title={title} id={id} fieldClose={fieldClose} />
        : <ScoringChampOpen id={id} fieldOpen={fieldOpen} titleField={titleField} />
      }

    </DefaultLayout>
  )
}

export default Create