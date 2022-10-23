import React from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Main = () => {
    const dumps = [
        { id: 0, lat: 54.515427399355154, lng: 36.24768254508607, description: '', img: '', verificationAmount: 1 },
        { id: 1, lat: 54.51507844132908, lng: 36.25071749461759, description: '', img: '', verificationAmount: 1 },
        { id: 2, lat: 54.5137573589381, lng: 36.24701764448197, description: '', img: '', verificationAmount: 1 },
        { id: 3, lat: 54.51338345993791, lng: 36.24993462777728, description: '', img: '', verificationAmount: 1 },
        { id: 4, lat: 54.51480425793142, lng: 36.25236902192451, description: '', img: '', verificationAmount: 1 },
        { id: 5, lat: 54.51317158231861, lng: 36.25183281175992, description: '', img: '', verificationAmount: 1 },
        { id: 6, lat: 54.51581374226371, lng: 36.2539025829952, description: '', img: '', verificationAmount: 1 },
        { id: 7, lat: 54.5151282926582, lng: 36.252937404698955, description: '', img: '', verificationAmount: 1 },
        { id: 8, lat: 54.515103367001224, lng: 36.253634477912904, description: '', img: '', verificationAmount: 1 },
        { id: 9, lat: 54.51476063767573, lng: 36.25354868428658, description: '', img: '', verificationAmount: 1 }
    ]

    return (
        <div className='Main'>
            <div className='Container'>
                <div className='mb-4'>
                    <h1>Главная 🔥</h1>
                    На карте обозначены незаконные свалки, вы можете прислать информацию о незаконной свалке, которую вы обнаружили!😮
                    <br />
                    После того, как ваша заявка пройдет модерацию, все узнают о незаконной свалке 🥰
                </div>

                <MapContainer center={[54.514635, 36.252962]} zoom={16} scrollWheelZoom={true}>
                    {dumps.map(dump =>
                        <Marker
                            key={dump.id}
                            position={[dump.lat, dump.lng]}
                        >
                            <Popup >
                                <div style={{ maxWidth: 200 }}>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id architecto nobis veritatis fuga repellat nulla expedita adipisci quo vero totam.
                                    <br />
                                    <img src="https://picsum.photos/200" />
                                </div>

                            </Popup>
                        </Marker>
                    )}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
                <h2>Lorem</h2>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id architecto nobis veritatis fuga repellat nulla expedita adipisci quo vero totam.
            </div>

        </div>
    )
}

export default Main