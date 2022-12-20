import React from 'react';
import { useState, useEffect } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';
import { useCallback } from 'react';

const Form = () => {
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const { tg } = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            city,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [city, street, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'SEND'
        })
    }, [])

    useEffect(() => {
        if (!city || !street) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [city, street])

    const onChangeCity = (e) => {
        setCity(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={'form'}>
            <h3>Enter your details</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'City'}
                value={city}
                onChange={onChangeCity}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Street'}
                value={street}
                onChange={onChangeStreet}
            />

            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Individual</option>
                <option value={'legal'}>Legal entity</option>
            </select>
        </div>
    );
};

export default Form;