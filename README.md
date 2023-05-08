


# Reto Empowerment

## Requisitos:

1. docker y docker-compose
2. nodejs y npm

## Pasos para ejecutar con docker:

1. Correr el comando `npm install`
2. Correr el comando `docker-compose up -d`
3. La aplicacion queda expuesta en el puerto 3000
4. Una vez el contenedor de la aplicacion este corriendo ejecute las migracionescon el comando `npm run migrations`

## Pasos para ejecutar las pruebas:

1. Correr el backend en docker
2. Ejecutar los test con el comando `npm run test`

## Endpoints de Swagger:

1. Una vez se este ejecutando la aplicacion tiene a disposicion el enpoint `http://localhost:3000/docs` para consultar todos los endpoints a su dispocision

## Pruebas desde postman:

1. Parametrice los restaurantes con el endpoint
```http
localhost:3000/v1/restaurants METHOD POST
```
Datos de prueba
| Parameter | Type     | value                |
| :-------- | :------- | :------------------------- |
| `name` | `string` |  Bufalo Wings|
| `score` | `number` |  5|
| `restaurant_type` | `string` |  Bufet|
| `kind_of_food` | `string` |  FastFood|
| `restaurant_size` | `string` |  150|
| `pet_friendly` | `boolean` |  true|
| `parking` | `boolean` |  true|
| `babysitter` | `boolean` |  true|

2. Parametrice los platillos con el endpoint
```http
localhost:3000/v1/restaurants  METHOD POST
```
Datos de prueba
| Parameter | Type     | value                |
| :-------- | :------- | :------------------------- |
| `name` | `string` |  Alas Wings|
| `score` | `number` |  5|
| `kind_of_food` | `string` |  FastFood|
| `ingredients` | `string` |  alas|

3. Podra consultar los restaurantes disponibles con la API
 ```http
localhost:3000/v1/restaurants  METHOD GET
```
4. Podra consultar los platos disponibles con la API
```http
localhost:3000/v1/dishes  METHOD GET
```
5. Por ultimo podra generar un recomendación con el endpoint
```http
localhost:3000/v1/recommendations METHOD POST
```
Datos de prueba
| Parameter | Type     | value                |
| :-------- | :------- | :------------------------- |
| `name` | `string` |  Bufalo Wings|
| `score` | `number` |  5|
| `ingredients` | `string` |  alas|
| `restaurant_type` | `string` |  Bufet|
| `kind_of_food` | `string` |  FastFood|
| `restaurant_size` | `string` |  150|
| `pet_friendly` | `boolean` |  true|
| `parking` | `boolean` |  true|
| `babysitter` | `boolean` |  true|
