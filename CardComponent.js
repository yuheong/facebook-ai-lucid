import React from 'react';
import { Card, Text } from 'react-native-elements';

export default function CardComponent({ cardText }) {
    return <Card>
        <Text>{cardText}</Text>
    </Card>
}