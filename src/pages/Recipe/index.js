import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useColor } from '../../hooks/useColor';


// styles
import './styles.scss'
import { projectFirestore } from '../../firebase/config';

import React, { useEffect, useState } from 'react'

export default function Recipe() {

    const [recipe, setRecipe] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState('');

    const { id } = useParams();
    const { mode } = useColor();

    useEffect(() => {
        setIsPending(true);
        projectFirestore.collection('recipes').doc(id).get().then((doc) => {
            if (doc.exists) {
                setIsPending(false);
                setRecipe(doc.data());
            } else {
                setIsPending(false);
                setError("Could not find that recipe")
            }
        })
    }, [id])





    return (
        <div className={`recipe ${mode} `}>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {recipe && (<>
                <h2 className='page-title'>{recipe.title}</h2>
                <p>Takes {recipe.cookingTime} to cook.</p>
                <ul>{recipe.ingredients.map((item) =>
                (<li key={item}>
                    {item}
                </li>))}
                </ul>
                <p className='method'>{recipe.method}</p>
            </>)}
        </div>
    )
}
