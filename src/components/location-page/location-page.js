import React from 'react'
import './location-page.css'
import ErrorIndicator from '../error-indicator'

const WikiData = ({info}) => {

        return (
            <div className="location__wiki">
                <a className="location__wiki-link" href={info.queryResultPageFullURL}>{info.queryResultPageTitle}</a>
            </div>
        )
}

const LocationPage = ({city, info}) => {
    
    if(info) {
            return (
                <section className="location">
                    <h1 className="location__header">Информация о месте вашего положения из Wikipedia</h1>
                    <p>{city}</p>
                    {           
                        info.map((data) => (
                            <WikiData key={data.queryResultPageID} info={data}/>
                        ))
                    }
                </section>
            )
        } else {
        return (
            <ErrorIndicator/>
        )
    }
}
export default LocationPage