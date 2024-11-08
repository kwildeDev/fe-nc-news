import { useState, useEffect } from 'react';
import { getTopics } from '../api';
import { Link } from 'react-router-dom';


const Nav = () => {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        getTopics()
        .then((topics) => {
            setTopics(topics)
            setIsLoading(false)
        })
        .catch((err) => {
            setIsError(true)
        })
    },[])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>There was an error</p>
    }

    return (
        <nav>
            <ul className="nav__list">
                <li className={'nav__listitem' && 'nav__listitem--special'}><Link to={{pathname: `/`}}>Most recent</Link></li>
                <hr />
                <li>Topics:</li>
                {topics.map((topic) => {
                    return <li className="nav__listitem" key={topic.slug}>
                        <Link to={{pathname: `/topics/${topic.slug}`}}>{topic.slug}: {topic.description}</Link>
                    </li>
                })}
            </ul>
        </nav>
    )
}

export default Nav