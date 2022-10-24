import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const Admin = () => {
    const [selected, setSelected] = useState(null);
    const [isCurrentShow, setIsCurrentShow] = useState(false);
    const [isNewShow, setIsNewShow] = useState(true);
    const [isDoneShow, setIsDoneShow] = useState(false);

    const [dumpsCurrent, setDumpsCurrent] = useState([
        { id: 0, lat: 54.515427399355154, lng: 36.24768254508607, description: '', img: '', verificationAmount: 1 },
        { id: 1, lat: 54.51507844132908, lng: 36.25071749461759, description: '', img: '', verificationAmount: 1 },
        { id: 2, lat: 54.5137573589381, lng: 36.24701764448197, description: '', img: '', verificationAmount: 1 },
    ])
    const [dumpsNew, setDumpsNew] = useState([
        { id: 3, lat: 54.51338345993791, lng: 36.24993462777728, description: '', img: '', verificationAmount: 1 },
        { id: 4, lat: 54.51480425793142, lng: 36.25236902192451, description: '', img: '', verificationAmount: 1 },
        { id: 5, lat: 54.51317158231861, lng: 36.25183281175992, description: '', img: '', verificationAmount: 1 },
    ])
    const [dumpsDone, setDumpsDone] = useState([
        { id: 6, lat: 54.51581374226371, lng: 36.2539025829952, description: '', img: '', verificationAmount: 1 },
        { id: 7, lat: 54.5151282926582, lng: 36.252937404698955, description: '', img: '', verificationAmount: 1 },
        { id: 8, lat: 54.515103367001224, lng: 36.253634477912904, description: '', img: '', verificationAmount: 1 },
    ])

    return (
        <div>
            <div className='Container'>
                <h1>Админ панель</h1>
                <Form>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        checked={isNewShow}
                        onChange={() => setIsNewShow(value => !value)}
                        label="Показать неподтвержденные свалки"
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        checked={isCurrentShow}
                        onChange={() => setIsCurrentShow(value => !value)}
                        label="Показать текущие свалки"
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        checked={isDoneShow}
                        onChange={() => setIsDoneShow(value => !value)}
                        label="Показать решенные свалки"
                    />
                </Form>
                <MapContainer center={[54.514635, 36.252962]} zoom={16} scrollWheelZoom={true}>
                    {isDoneShow && dumpsDone.map(dump =>
                        <Marker
                            key={dump.id}
                            position={[dump.lat, dump.lng]}
                        >
                            <Popup >
                                <div style={{ maxWidth: '100vw' }}>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id architecto nobis veritatis fuga repellat nulla expedita adipisci quo vero totam.
                                    <br />
                                    <img src="https://picsum.photos/200" />
                                    <div className='d-flex justify-content-between'>
                                        <Button className="mt-3" variant='danger'>Удалить</Button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    )}
                    {isCurrentShow && dumpsCurrent.map(dump =>
                        <Marker
                            key={dump.id}
                            position={[dump.lat, dump.lng]}
                        >
                            <Popup >
                                <div style={{ maxWidth: '100vw' }}>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id architecto nobis veritatis fuga repellat nulla expedita adipisci quo vero totam.
                                    <br />
                                    <img src="https://picsum.photos/200" />
                                    <div className='d-flex justify-content-between'>
                                        <Button className="mt-3" variant='danger'>Удалить</Button>
                                        <Button className="mt-3">Решить</Button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    )}

                    {isNewShow && dumpsNew.map(dump =>
                        <Marker
                            key={dump.id}
                            position={[dump.lat, dump.lng]}
                        >
                            <Popup >
                                <div style={{ maxWidth: '100vw' }}>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id architecto nobis veritatis fuga repellat nulla expedita adipisci quo vero totam.
                                    <br />
                                    <img src="https://picsum.photos/200" />
                                    <div className='d-flex justify-content-between'>
                                        <Button className="mt-3" variant='danger'>Удалить</Button>
                                        <Button className="mt-3">Подтвердить</Button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    )}

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        </div>
    )
}

export default Admin