import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Link } from '@inertiajs/inertia-react';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';
function Detail({ inscription, myInscription, scoringOpenField, fieldScoring, scoringCloseField, cities, provinces, regions, filiere_bacs, ecoles, logements, orphelinats, situation__socials, information__pluses }) {
    const [countPoint, setCountPoint] = useState(0)
    const dataInscription = inscription.map((item, index) => {

        const newObj = { ...JSON.parse(item.dataForm), status: item.status, id: item.user_id, indepoint: index + 1 }
        return newObj;
    })
    // console.log("data", dataInscription);
    // console.log('open',scoringOpenField)
    const filteredTranchData = scoringOpenField.filter(item => item.type === 'tranche');


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Detail'));
    });

    console.log('close', scoringCloseField)
    const MethodCloseField = () => {
        const recupById = () => {
            return dataInscription.map(item => {

                const objRegion = regions.find(region => region.id == item.regionOfOrigin)
                const objProvince = provinces.find(province => province.id == item.provinceOfOrigin)

                return { ...item, regionOfOrigin: objRegion.name_region, provinceOfOrigin: objProvince.name_province }
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
                    field_name: fieldItem.name,
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
                    field_name: fieldItem.name,
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
        console.log('resultee', result);
        console.log('recup--', dataInscriptionComplete);
        const obj = null
        const recupData = result.map((item) => dataInscriptionComplete.map((insc) => {

            if (insc[item.value] == "Famille d'accueil") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            } else if (insc[item.value] == "Avec les parents") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            } else if (insc[item.value] == "EPS") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[3], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Internat") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[4], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            } else if (insc[item.value] == "Normale") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            } else if (insc[item.value] == "Orphelin") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Abandonné") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[3], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            } else if (insc[item.value] == "Parent divorcés") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[4], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            } else if (insc[item.value] == "de pere") {
                return { ...obj, id: insc.id, val: "de pére", name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            } else if (insc[item.value] == "de mere") {
                return { ...obj, id: insc.id, val: "de mére", name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "les deux") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[3], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            } else if (insc[item.value] == "Réseaux sociaux") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Caravane JADARA") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Boursiers JADARA") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[3], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Site d’orientation") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[4], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Affichage au Lycée") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[5], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            } else if (insc[item.value] == "2020") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "2021") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "2022") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[3], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "2O23") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[4], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "25%") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "50%") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "75%") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[3], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "100%") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[4], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Masculin") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Féminin") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Mon pere") {
                return { ...obj, id: insc.id, val: "Mon pére", name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Ma mere") {
                return { ...obj, id: insc.id, val: "Ma mére", name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "yes") {
                return { ...obj, id: insc.id, val: "Oui", name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] =="no") {
                return { ...obj, id: insc.id, val: "Non", name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "trueF") {
                return { ...obj, id: insc.id, val: "Oui", name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "falseF") {
                return { ...obj, id: insc.id, val: "Non", name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "trueFB") {
                return { ...obj, id: insc.id, val: "Oui", name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "falseFB") {
                return { ...obj, id: insc.id, val: "Non", name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "trueM") {
                return { ...obj, id: insc.id, val: "Oui", name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "falseM") {
                return { ...obj, id: insc.id, val: "Non", name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }

            else if (insc[item.value] == "trueMB") {
                return { ...obj, id: insc.id, val: "Oui", name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "falseMB") {
                return { ...obj, id: insc.id, val: "Non", name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Oui") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Non") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            } else if (insc[item.value] == "retraiteM") {
                return { ...obj, id: insc.id, val: "Retraite", name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "retraite") {
                return { ...obj, id: insc.id, val: "Retraite", name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            } else if (insc[item.value] == "Moteur") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            } else if (insc[item.value] == "Mental") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            } else if (insc[item.value] == "Psychique") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            } else if (insc[item.value] == "Sensoriel") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            } else if (insc[item.value] == "Sciences Agronomiques") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[1], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Sciences Economiques") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[2], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Techniques de Gestion Et Comptabilité") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[3], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Science de Vie Et Terre") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[4], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Lettres") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[5], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            } else if (insc[item.value] == "Sciences Humaines") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[6], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Sciences Mathématiques A") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[7], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Sciences Mathématiques B") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[8], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Sciences de la Chariaa") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[9], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Langue Arabe") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[10], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Arts Appliqués") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[11], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }

            else if (insc[item.value] == "Sciences Physiques") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[12], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Sciences et Technologies Electriques") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[13], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }
            else if (insc[item.value] == "Sciences et Technologies Mécaniques") {
                return { ...obj, id: insc.id, val: insc[item.value], name: insc.name, point: item[14], field: item.value, coef: item.coef, school: insc.schoolName, city: insc.cityOfOrigin, region: insc.regionOfOrigin, province: insc.provinceOfOrigin, field_name: item.field_name, }

            }

        }))

        const filteredArray = recupData.map(subArray =>
            subArray.filter(item => item !== undefined)
        )

        console.log('eeeeeeeeeeeeeeeeeeeeeeeeee', filteredArray);

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
            console.log('taberc(((((((((', tableauFinal);
            const tableauRegroupeFinal = tableauFinal.map((tableau, key) => {
                const id = tableau[0].id;
                const name = tableau[0].name;
                const totalPoints = tableau.totalPoints.toFixed(2);
                const index = key + 1;
                const city = tableau[0].city;
                const province = tableau[0].province;
                const region = tableau[0].region;
                const school = tableau[0].school
                return { tableauFinal, totalPoints, id };
            });
            console.log('ddddddddd', tableauRegroupeFinal);
            const points = tableauRegroupeFinal.map((item, key) => { item.id, item.totalPoints })
            const sum = points.reduce((accumulator, currentValue) => {
                const parsedValue = parseFloat(currentValue);
                if (!isNaN(parsedValue)) {
                    return accumulator + parsedValue;
                } else {
                    return accumulator;
                }
            }, 0);


            return tableauFinal;
        }


        const myData = regrouperTableaux(filteredArray)
        const myData1 = regrouperTableaux(filteredArray1);
        console.log('please', myData1);
        const addPoint1 = myData1.map((item, keys) => item.map((obj) => ({ ...obj, totalPoints: item.totalPoints })))
        const addPoint = myData.map((item, keys) => item.map((obj) => ({ ...obj, totalPoints: item.totalPoints })))


        const filteredUsers = addPoint1.flat().filter(user => user.id === myInscription.user_id);
        const filteredUsers1 = addPoint.flat().filter(user => user.id === myInscription.user_id);


        const mergedArray = filteredUsers1.concat(filteredUsers);
        const plusPetit = mergedArray.reduce((min, element) => {
            return element.totalPoints < min ? element.totalPoints : min;
        }, mergedArray[0].totalPoints);


        const plusGrand = mergedArray.reduce((max, element) => {
            return element.totalPoints > max ? element.totalPoints : max;
        }, mergedArray[0].totalPoints);
        console.log("TotalPoints le plus petit :", plusPetit);
        console.log("TotalPoints le plus grand :", plusGrand);
        useEffect(() => {
            setCountPoint(plusGrand + plusPetit)

        })
        console.log('last', mergedArray);
        return mergedArray;

    }
    console.log('goli aaaaaaaaaaaa', MethodCloseField());
    return (
        <DefaultLayout>
            <div>
                <div className="panel">
                    {/* <h2><span>Nom du candidat : </span> </h2> */}
                    <div className="table-responsive mb-5">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Champ</th>
                                    <th>Valeur</th>
                                    <th>Point</th>
                                    <th>Poids</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MethodCloseField().map((item, keys) => (<tr key={keys} className=" border-dark-dark-light">
                                    <td>{keys + 1}</td>
                                    <td>{item.field_name}</td>
                                    <td>{item.val}</td>
                                    <td>{item.point}</td>
                                    <td>{item.coef}%</td>

                                </tr>))}



                                <tr className="">
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td colSpan={2} className={`badge bg-success font-black  text-md self-center uppercase`}> <span>Point Total : {countPoint}</span> </td>


                                    {/* <td>park@yahoo.com</td> */}

                                </tr>



                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Detail