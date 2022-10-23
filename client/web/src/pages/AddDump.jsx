import React, { useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import { resizeTextArea } from '../utils/resizeTextArea'

const Locate = ({ setPosition }) => {
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng)
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })


    return null;
}

const AddDump = () => {
    const mapRef = useRef();
    const markerRef = useRef();

    const [position, setPosition] = useState(null);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const addDump = e => {
        e.preventDefault();

        if (!position) return;
        if (e.target.checkValidity() === false) {
            e.stopPropagation();
        }


        const formData = new FormData();
        formData.append('position', position);
        formData.append('description', description);
        formData.append('img', file);
        console.log(formData);
        // Request
    }

    // resize textarea
    const textareaRef = useRef();
    useEffect(() => {
        resizeTextArea(textareaRef)
    }, [description])

    return (
        <div className='AddDump'>
            <div className='Container'>
                <h1>Отправить информацию о незаконной свалке</h1>
                <h3>1. Местоположение свалки</h3>
                <MapContainer
                    ref={mapRef}
                    center={[54.514635, 36.252962]}
                    zoom={16}
                    scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        position &&
                        <Marker
                            ref={markerRef}
                            draggable={true}
                            position={[position.lat, position.lng]}
                            eventHandlers={
                                {
                                    dragend(e) {
                                        setPosition(markerRef.current.getLatLng())
                                    }
                                }
                            }
                        >

                        </Marker>
                    }

                    <Locate setPosition={setPosition} />
                </MapContainer>
                <div className='d-flex flex-row-reverse mt-3'>
                    <Button onClick={() => mapRef.current.locate()}>
                        Найти меня на карте 🤔
                    </Button>
                </div>

                <h3 className='mt-4'>2. Информация о свалке</h3>

                <Form onSubmit={addDump}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Описание
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                required
                                style={{ resize: 'none !important' }}
                                as='textarea'
                                ref={textareaRef}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Прикрепите фото свалки</Form.Label>
                        <Form.Control
                            required
                            accept=".jpg,.png"
                            onChange={e => setFile(e.target.files[0])}
                            type="file"
                        />
                    </Form.Group>
                    <div className='d-flex flex-row-reverse'>
                        <Button type='submit'>Отправить 🔥</Button>
                    </div>
                </Form>
            </div>
        </div >
    )
}

export default AddDump