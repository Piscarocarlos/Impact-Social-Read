import React, { useState , useEffect } from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import { usePage } from "@inertiajs/inertia-react";
import { useRef } from "react";
import { saveAs } from "file-saver";
import CandidatureFiltreCore from './CandidatureFiltreCore';



function CandidatureFiltre() {
    const { tableData } = usePage().props;
    const { decodedArray } = usePage().props;
    const [parentFilteredArray, setParentFilteredArray] = useState([]);


    console.log('Filters:', tableData);

    console.log('Unfiltered DATA:', decodedArray);

    console.log('Filtered DATA:', parentFilteredArray);
  
    return (
        <DefaultLayout>
        <CandidatureFiltreCore setParentFilteredArray={setParentFilteredArray} tableData={tableData} decodedArray={decodedArray}/>
<h1 className="panel">OTHER PAGE CONTENT</h1>
      </DefaultLayout>
    );
}

export default CandidatureFiltre;
