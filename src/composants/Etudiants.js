import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import "../App.css"
function Etudiants() {
     
    const [etudiants,setEtudiants]=useState([
              {id:1,nom:"rami",filiere:"informatique",note:15},
              {id:2,nom:"Jamali",filiere:"informatique",note:17},
              {id:3,nom:"hasnaoui",filiere:"informatique",note:14}
    ]);

    const[nom,setNom]=useState("");
    const[filiere,setFiliere]=useState("");
    const[note,setNote]=useState(0);
    const[afficherForm,setAfficheForm]=useState(false);
    const[etudId,setEtudId]=useState(0);
    
    function handleDelete(etd){
        const etudiantsCopie=etudiants.filter(ele=>ele.id!==etd.id);
        setEtudiants(etudiantsCopie);
    }
    function initialiser(){
        setNom("");
        setNote(0);
        setFiliere("");
    }
    function handleSubmit (e){
           e.preventDefault();
           if(etudId==0) {  // ajout un nouveau etudoant
             let id=new Date().getTime();
             let newEtudiant={id:id,nom:nom,note:note,filiere};
             setEtudiants([...etudiants,newEtudiant]);
           }
           else{  // modification de l'etudiant
                const etudiant=etudiants.find(ele=>ele.id==etudId);
                const etudiantsModifier=etudiants.map(ele=>
                    ele.id===etudiant.id? 
                    (ele={id:etudiant.id,nom:nom,note,filiere})
                        :{
                            id:ele.id,
                            nom:ele.nom,
                            note:ele.note,
                            filiere:ele.filiere
                        }
                     )
                setEtudiants(etudiantsModifier);
                setEtudId(0);
           }
           setAfficheForm(false);
           initialiser();
    }
    function handleModifier(etd){
          //const etudiant=etudiants.find(ele=>ele.id==etd.id);
          setNom(etd.nom);
          setNote(etd.note);
          setFiliere(etd.filiere);
          setEtudId(etd.id);
         setAfficheForm(true);

    }

  return (
    <div className='App-header'>
        <div className='card'>
            <div className='card-header'>
                <h2>Lites des Etudiants</h2>
            </div>
            <div className='m-2 ms-auto'>
                <button 
                className='btn btn-outline-info' 
                onClick={()=>setAfficheForm(true)}
                >
                Ajouter Etudiant
                </button>
            </div>
            <div className='card-body'>
               <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Note</th>
                        <th>Filiere</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        etudiants.map(etd=> (
                            <tr>
                                <td>{etd.nom}</td>
                                <td>{etd.note}</td>
                                <td>{etd.filiere}</td>
                                <td><button 
                                    className='btn btn-outline-danger' 
                                    onClick={()=>handleDelete(etd)}
                                    >
                                    supprimer</button>
                                </td>
                                <td><button 
                                    className='btn btn-outline-success' 
                                    onClick={()=>handleModifier(etd)}
                                    >
                                    modifier</button>
                                </td>
                            </tr>
                            )
                        )
                    }
                </tbody>
               </table>
            </div>

        </div>
        {
          afficherForm &&  <div className='card mt-2'>
            <div className='card-body'>
               <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label className='form-label'>Nom </label>
                    <input  type="text"  
                            className='form-control' 
                            value={nom} 
                            onChange={(e)=>setNom(e.target.value)}
                    s/>
                  </div>
                  <div className='form-group'>
                    <label className='form-label'>Note </label>
                    <input type="text"  className='form-control' value={note} 
                       onChange={(e)=>setNote(e.target.value)}/>
                  </div>
                  <div className='form-group'>
                    <label className='form-label'>Filiere </label>
                    <input type="text"  className='form-control' value={filiere} 
                       onChange={(e)=>setFiliere(e.target.value)}/>
                  </div>
                  <div className='mt-2'>
                    <button className='btn btn-outline-primary'>Enregistrer</button>
                  </div>
               </form>
            </div>

            </div>
        }
    </div>
  )
}

export default Etudiants