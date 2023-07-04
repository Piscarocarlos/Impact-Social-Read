import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Link, useForm } from '@inertiajs/inertia-react';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';
import Select from 'react-select';
import { encodeID } from '../../keys/Index';
import Swal from 'sweetalert2';


function Result({ inscription, scoringOpenField, fieldScoring, scoringCloseField, cities, provinces, beneficiaries, regions, filiere_bacs, ecoles, logements, orphelinats, situation__socials, information__pluses }) {









    console.log("retuiuujn", beneficiaries);

    const beneficiaryObj =beneficiaries[0]?JSON.parse(beneficiaries[0].dataBeneficiary):Null;
    console.log('re', beneficiaryObj)
    const beneficiary = beneficiaryObj?.dataBenificiary;
    // console.log('reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeedfff', beneficiary)



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

    const dataInscription = inscription.map((item, index) => {

        const newObj = { ...JSON.parse(item.dataForm), status: item.status, id: item.user_id, indepoint: index + 1 }
        return newObj;
    })
    // console.log("data", dataInscription);
    // console.log('open',scoringOpenField)
    const filteredTranchData = scoringOpenField.filter(item => item.type === 'tranche');
    // console.log('tranch',filteredTranchData);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Result'));
    });

    console.log('close', scoringCloseField)
    const MethodCloseField = () => {
        const recupById = () => {
            return dataInscription.map(item => {

                const objRegion = regions.find(region => region.id == item.regionOfOrigin)
                const objProvince = provinces.find(province => province.id == item.provinceOfOrigin)
                const objCity = cities.find(city => city.id == item.cityOfOrigin)

                return { ...item, regionOfOrigin: objRegion.name_region, provinceOfOrigin: objProvince.name_province,cityOfOrigin: objCity.name_city}
            })
        }

        const dataInscriptionComplete = recupById()
        console.log('ertyttg', dataInscriptionComplete);
        const result = scoringCloseField
            .filter((item) => fieldScoring.some((fieldItem) => fieldItem.id === item.field_id))
            .map((item) => {
                const fieldItem = fieldScoring.find((fieldItem) => fieldItem.id === item.field_id);
                const parsedData = JSON.parse(item.data);
                return {
                    ...parsedData,
                    field_id: item.field_id,
                    value: fieldItem.value,
                    coef: fieldItem.coef,
                };
            });
        const result1 = filteredTranchData
            .filter((item) => fieldScoring.some((fieldItem) => fieldItem.id === item.field_id))
            .map((item) => {
                const fieldItem = fieldScoring.find((fieldItem) => fieldItem.id === item.field_id);
                const parsedData = JSON.parse(item.data);
                return {
                    ...parsedData,
                    field_id: item.field_id,
                    value: fieldItem.value,
                    coef: fieldItem.coef,
                };
            });

        const obj1 = null
        const recupData1 = result1.map((item) => dataInscriptionComplete.map((insc) => {
            if (insc[item.value]) {


                if ((+insc[item.value]) >= (+item.min) && (+insc[item.value]) < (+item.max)) {
                    return { ...obj1, id: insc.id, val: insc[item.value], name: insc.name, field_name: item.field_name, city: insc.cityOfOrigin, region: insc.regionOfOrigin, school: insc.schoolName, province: insc.provinceOfOrigin, point: +item.val, field: item.value, coef: item.coef }

                }
            }

        }))

        const filteredArray1 = recupData1.map(subArray =>
            subArray.filter(item => item !== undefined)
        ).filter(subArray => subArray.length > 0);
        console.log('ee', recupData1);
        console.log('recup2', filteredArray1);
        const obj = null
        const recupData = result.map((item) => dataInscriptionComplete.map((insc) => {

            if (insc[item.value] == "Famille d'accueil") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            } else if (insc[item.value] == "Avec les parents") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            } else if (insc[item.value] == "EPS") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[3], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Internat") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[4], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            } else if (insc[item.value] == "Normale") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            } else if (insc[item.value] == "Orphelin") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Abandonné") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[3], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            } else if (insc[item.value] == "Parent divorcés") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[4], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            } else if (insc[item.value] == "de pere") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            } else if (insc[item.value] == "de mere") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "les deux") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[3], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            } else if (insc[item.value] == "Réseaux sociaux") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Caravane JADARA") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Boursiers JADARA") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[3], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Site d’orientation") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[4], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Affichage au Lycée") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[5], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            } else if (insc[item.value] == "2020") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "2021") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "2022") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[3], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "2O23") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[4], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "25%") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "50%") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "75%") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[3], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "100%") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[4], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Masculin") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Féminin") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Mon pere") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Ma mere") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "yes") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "no") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "trueF") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "falseF") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "trueFB") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "falseFB") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "trueM") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "falseM") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }

            else if (insc[item.value] == "trueMB") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "falseMB") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Oui") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Non") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            } else if (insc[item.value] == "retraiteM") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "retraite") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }  else if (insc[item.value] == "Moteur") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            } else if (insc[item.value] == "Mental") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin,  }

            } else if (insc[item.value] == "Psychique") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin,  }

            } else if (insc[item.value] == "Sensoriel") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            } else if (insc[item.value] == "Sciences Agronomiques") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Sciences Economiques") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Techniques de Gestion Et Comptabilité") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[3], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Science de Vie Et Terre") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[4], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Lettres") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[5], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            } else if (insc[item.value] == "Sciences Humaines") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[6], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Sciences Mathématiques A") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[7], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Sciences Mathématiques B") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[8], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Sciences de la Chariaa") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[9], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Langue Arabe") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[10], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Arts Appliqués") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[11], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }

            else if (insc[item.value] == "Sciences Physiques") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[12], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Sciences et Technologies Electriques") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[13], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }
            else if (insc[item.value] == "Sciences et Technologies Mécaniques") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[14], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, }

            }

        }))

        const filteredArray = recupData.map(subArray =>
            subArray.filter(item => item !== undefined)
        )


        function regrouperTableaux(tableaux) {
            const tableauxRegroupes = {};

            tableaux.forEach((tableau, index) => {
                tableau.forEach(objet => {
                    const { id, point, coef } = objet;

                    if (tableauxRegroupes[id]) {
                        tableauxRegroupes[id].push(objet);
                    } else {
                        tableauxRegroupes[id] = [objet];
                    }

                    // Ajouter les points au total correspondant à l'ID
                    if (tableauxRegroupes[id].totalPoints) {
                        tableauxRegroupes[id].totalPoints += (+point * (coef / 100));
                    } else {
                        tableauxRegroupes[id].totalPoints = (+point * (coef / 100));
                    }
                });
            });

            const tableauFinal = Object.values(tableauxRegroupes);
            console.log('taberc', tableauFinal);
            const tableauRegroupeFinal = tableauFinal.map((tableau, key) => {
                const id = tableau[0].id;
                const name = tableau[0].name;
                const totalPoints = tableau.totalPoints.toFixed(2);
                const index = key + 1;
                const city = tableau[0].city;
                const province = tableau[0].province;
                const region = tableau[0].region;
                const school = tableau[0].school
                return { id, name, totalPoints, index, city, province, region, school };
            });

            return tableauRegroupeFinal;
        }


        const myData = regrouperTableaux(filteredArray)
        const myData1 = regrouperTableaux(filteredArray1);
        // console.log('please', myData1);
        // console.log('policate', myData);

        const objData = null
        const resultat = myData.map((item) => myData1.filter(item1 => item.id == item1.id).map(item2 => ({ ...objData, id: item.id, name: item.name, province: item.province, city: item.city, school: item.school, region: item.region, totalPoints: (+((+item.totalPoints) + (+item2.totalPoints))).toFixed(2) })
        )).flat()
        const addPlace = () => {
            const sortTab = resultat.sort((a, b) => b.totalPoints - a.totalPoints);
            return sortTab.map((item, index) => ({ ...item, keys: index + 1 }))
        }
        const finalTab = addPlace();

        return finalTab;

    }


    console.log('methosd', MethodCloseField());
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    //Skin: Striped

    const [page, setPage] = useState(1);
    const [regionSearch, setRegionSearch] = useState('');
    const [provinceSearch, setProvinceSearch] = useState('');
    const [citySearch, setCitySearch] = useState('');
    const [schoolSearch, setSchoolSearch] = useState('');
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(MethodCloseField());
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [lengthTab, setLengthTab] = useState()
    const { data, setData, processing, errors, reset, put, post } = useForm(

    );
    const { data: dataForm1, setData: setDataForm1, errors: errorsForm1, put: putForm1, post: postForm1 } = useForm()
    const { data: dataForm2, setData: setDataForm2, errors: errorsForm2, put: putForm2, post: postForm2 } = useForm()
    const { data: dataForm3, setData: setDataForm3, errors: errorsForm3, put: putForm3, post: postForm3 } = useForm()
    const [search, setSearch] = useState('');

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return MethodCloseField().filter((item, index) => {

                return (
                    item.keys.toString().includes(search.toLowerCase()) ||

                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.totalPoints.includes(search.toLowerCase()) ||
                    item.region.toLowerCase().includes(search.toLowerCase()) ||
                    item.city.toLowerCase().includes(search.toLowerCase()) ||
                    item.province.toLowerCase().includes(search.toLowerCase()) ||
                    item.school.toLowerCase().includes(search.toLowerCase()) ||
                    item.id.toString().includes(search.toLowerCase())


                );
            });
        });
    }, [search]);
    useEffect(() => {
        setInitialRecords(() => {
            return MethodCloseField().filter((item, index) => item.region.toLowerCase().includes(regionSearch.toLowerCase()));
        });
    }, [regionSearch]);
    useEffect(() => {
        setInitialRecords(() => {
            return MethodCloseField().filter((item, index) => item.city.toLowerCase().includes(citySearch.toLowerCase()));
        });
    }, [citySearch]);
    useEffect(() => {
        console.log('province');
        setInitialRecords(() => {
            return MethodCloseField().filter((item, index) => item.province.toLowerCase().includes(provinceSearch.toLowerCase()));
        });
    }, [provinceSearch]);
    useEffect(() => {
        setInitialRecords(() => {
            return MethodCloseField().filter((item, index) => item.school.toLowerCase().includes(schoolSearch.toLowerCase()));
        });
    }, [schoolSearch]);
    useEffect(() => {
        setLengthTab(MethodCloseField().length)
    })
    const showMessage = (msg = '', type = 'success') => {
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    }
    const submit = (e) => {
        e.preventDefault()

        post(route('dashboard.store.list.beneficiary'))

    }
    const submit1 = (e) => {
        e.preventDefault()
        const unionById = dataForm1.dataBenificiary.concat(beneficiary).reduce((acc, obj) => {
            const foundIndex = acc.findIndex(item => item.id === obj.id);
            if (foundIndex === -1) {
                acc.push(obj);
            }
            return acc;
        }, []);
        console.log('reeeekcfnssssssssssssscksfhjgv', unionById);
        if (dataForm1.dataBenificiary.length === 0) {
            showMessage("Aucun candidat trouvé!", 'error')

        }
        else if (unionById.length === beneficiary.length) {
            showMessage("Tous les candidats sélectionné  existent déja comme bénéficiaire!", 'error')

        }
        //else{
        //     // post(route('dashboard.store.list.beneficiary'))
        // }
        console.log('DETRESDFV', e.target);

        console.log('DETRESDFV', dataForm1.dataBenificiary.length);
        // post(route('dashboard.store.list.beneficiary'))

    }
    return (
        <DefaultLayout>



            <div className="space-y-6">
                <div className="">
                    <div className="select-beneficiary">
                        <div className="panel my-6">
                            <div className='relative flex items-center my-5 border p-3.5 rounded text-success bg-success-light border-success ltr:border-l-[64px] rtl:border-r-[64px] dark:bg-success-dark-light' >
                                <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            opacity="0.5"
                                            d="M5.31171 10.7615C8.23007 5.58716 9.68925 3 12 3C14.3107 3 15.7699 5.58716 18.6883 10.7615L19.0519 11.4063C21.4771 15.7061 22.6897 17.856 21.5937 19.428C20.4978 21 17.7864 21 12.3637 21H11.6363C6.21356 21 3.50217 21 2.40626 19.428C1.31034 17.856 2.52291 15.7061 4.94805 11.4063L5.31171 10.7615Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path d="M12 8V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <circle cx="12" cy="16" r="1" fill="currentColor" />
                                    </svg>
                                </span>
                                <span className='ltr:mr-1 rtl:ml-1'> Veuillez sélectionner le nombre total de candidat bénéficiaire d'une bourse. <span className='font-black'>interval [ 1 - {lengthTab} ]</span>   </span>

                            </div>
                            <form onSubmit={submit} >
                                <div className=" mb-5 flex items-center justify-between ">


                                    <input type="number"
                                        onChange={e => setData('dataBenificiary', MethodCloseField().slice(0, +e.target.value))}
                                        className="form-input" placeholder={`Entrez un nombre maximum ${lengthTab}`}
                                        max={lengthTab}

                                    />

                                    <button className='mx-3 btn btn-success ' type='submit'>Valider</button>
                                </div>
                            </form>
                        </div>
                        {/* <div className="panel mt-4">
                            <h2 className='ltr:mr-1 rtl:ml- font-bold text-xl text-center mb-4'> Selection des bénéficiaires par filtre </h2>

                            <div className="flex items-center justify-between mb-5 ">
                                <form className='flex items-center  mb-5 w-1/3' onSubmit={submit1}>
                                    <select className='form-select  mx-1 ' name="region" id="" onChange={e => setDataForm1('dataBenificiary', MethodCloseField().filter((item, index) => item.region.toLowerCase().includes(e.target.value.toLowerCase())))}><option value="">sélectionner  une region...</option >{regions.map((item, keys) => (<option value={item.name_region}>{item.name_region} </option>))} </select>
                                    <button className='mx-3 btn btn-warning ' type='submit'>Valider</button>
                                </form>
                                <form className='flex items-center  mb-5 w-1/3'>
                                    <select className='form-select  mx-1' name="province" id="" onChange={e => setProvinceSearch(e.target.value)}><option value="">sélectionner  une province...</option>{provinces.map((item, keys) => (<option value={item.name_province} >{item.name_province} </option>))} </select>
                                    <button className='mx-3 btn btn-secondary ' type='submit'>Valider</button>

                                </form>
                                <form className='flex items-center mb-5 w-1/3' >
                                    <select className='form-select  mx-1' name="city" id="" onChange={e => setCitySearch(e.target.value)}><option value="">sélectionner  une ville...</option>{cities.map((item, keys) => (<option value={item.name_city}>{item.name_city} </option>))} </select>
                                    <button className='mx-3 btn btn-primary ' type='submit'>Valider</button>

                                </form>
                            </div>

                        </div> */}
                    </div>
                </div>
                <div className="panel">

                    <div className="flex items-center justify-between mb-5">

                        <h5 className="font-semibold text-lg dark:text-white-light">Résultat des candidatures</h5>
                        <input type="text" className="form-input w-auto" placeholder="Recherche rapide..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-between mb-5">
                        <select className='form-select w-auto mx-1 ' name="region" id="" onChange={e => setRegionSearch(e.target.value)}><option value="">sélectionner  une region...</option >{regions.map((item, keys) => (<option value={item.name_region}>{item.name_region} </option>))} </select>
                        <select className='form-select w-auto mx-1' name="province" id="" onChange={e => setProvinceSearch(e.target.value)}><option value="">sélectionner  une province...</option>{provinces.map((item, keys) => (<option value={item.name_province} >{item.name_province} </option>))} </select>
                        <select className='form-select w-auto mx-1' name="city" id="" onChange={e => setCitySearch(e.target.value)}><option value="">sélectionner  une ville...</option>{cities.map((item, keys) => (<option value={item.name_city}>{item.name_city} </option>))} </select>
                        <select className='form-select w-auto mx-1' name="school" id="" onChange={e => setSchoolSearch(e.target.value)}><option value="">sélectionner  une école...</option>{ecoles.map((item, keys) => (<option value={item.nom_fr} >{item.nom_fr} </option>))} </select>

                    </div>
                    <div className="datatables">
                        <DataTable
                            striped
                            className="whitespace-nowrap table-striped"
                            records={recordsData}
                            columns={[
                                { accessor: 'keys', title: 'Rang' },
                                { accessor: 'name', title: 'Nom' },

                                { accessor: 'region', title: 'Region' },
                                { accessor: 'province', title: 'Province' },
                                { accessor: 'city', title: 'Ville' },
                                { accessor: 'school', title: "Lycée" },
                                {
                                    accessor: 'totalPoints',
                                    title: 'Point',
                                    render: ({ totalPoints }) => <span className='text-white inline-block p-2 rounded hover:text-gray-100 mr-2 bg-danger '>{totalPoints} </span>,

                                },
                                {
                                    accessor: 'id',
                                    title: 'Action',
                                    render: ({ id }) => <Link href={route('dashboard.detail.scoring.candidate', encodeID(id))} className='text-white inline-block p-2 rounded hover:text-gray-100 mr-2 bg-blue-600 '><FiEye /></Link>,
                                },
                            ]}
                            totalRecords={initialRecords.length}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={(p) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            minHeight={200}
                            paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        />
                    </div>
                </div>

            </div>
        </DefaultLayout>
    )
}

export default Result