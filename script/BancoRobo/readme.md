## Rotas de acesso ao banco:

**Login:** /robo/<id_robo>/login


**Registrar:** /robo/<id_robo>/register

- Formato json do register:

 ```
{
"login": "olokinhomeu",
"senha": "123",
"nome": "Faustao",
"sobrenome": "Silva",
"email": "f@gmail.com"
}
 ```

**Sensor de distancia:** /robo/<id_robo>/sensorDistancia
- Formato json do sensor de distancia:
```
[
  {
    "Data e Hora": "Thu, 10 Feb 2022 21:44:42 GMT", 
    "Informacao do Sensor": 20.0
  }, 
  {
    "Data e Hora": "Thu, 10 Feb 2022 21:44:45 GMT", 
    "Informacao do Sensor": 55.0
  }
]
```

**Sensor de temperatura:** /robo/<id_robo>/sensorTemperatura
- Formato json do sensor de temperatura:
```
[
  {
    "Data e Hora": "Thu, 10 Feb 2022 21:44:42 GMT", 
    "Informacao do Sensor": 20.0
  }, 
  {
    "Data e Hora": "Thu, 10 Feb 2022 21:44:45 GMT", 
    "Informacao do Sensor": 55.0
  }
]

```


**Sensor de luz:** /robo/<id_robo>/sensorLuz
- Formato json do sensor de luz:
```
[
  {
    "Data e Hora": "Thu, 10 Feb 2022 21:44:42 GMT", 
    "Informacao do Sensor": 20.0
  }, 
  {
    "Data e Hora": "Thu, 10 Feb 2022 21:44:45 GMT", 
    "Informacao do Sensor": 55.0
  }
]

```

**Sensor de gas:** /robo/<id_robo>/sensorGas
- Formato json do sensor de gas:
```
[
  {
    "Data e Hora": "Thu, 10 Feb 2022 21:44:42 GMT", 
    "Informacao do Sensor": 20.0
  }, 
  {
    "Data e Hora": "Thu, 10 Feb 2022 21:44:45 GMT", 
    "Informacao do Sensor": 55.0
  }
]

```