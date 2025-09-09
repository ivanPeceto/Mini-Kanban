# Mini-Kanban
Proyecto entregable a modo de prueba técnica.

# Videos


https://github.com/user-attachments/assets/6389ae37-8c7a-4f5e-a436-370b992b3ebf



https://github.com/user-attachments/assets/e35d3605-4211-4b96-861d-d6f59d3701cf



# Instalación
Requisitos: docker instalado
- Renombrar `.env.test.example` y `.env.example` a `.env.test` y  `.env`.
- Luego correr los siguientes comandos en orden:
```
docker compose up -d --build

//Una vez se levanten los contenedores y esté disponible el servicio api
docker compose exec api npm run migration:run

```
- Luego entrar a http://localhost:4200 para comenzar a interactuar con el proyecto

# Pruebas
Para correr los testeos e2e de los endpoints de la api:
```
docker compose -f docker-compose.yml -f docker-compose.test.yml --env-file=.env.test up --build

//Una vez que esté disponible el servicio api
docker compose exec api npm run test:e2e

```

# Uso de IA
Para desarrollar este proyecto hice uso de Gemini AI Pro 2.5.

Mi enfoque fue el de utilizarlo como asistente de programación y debugger para salir de estancamientos.

Hice uso de la documentación oficial de Nest.js y Angular para iniciar los proyectos e investigar sobre las prácticas utilizadas en los ejemplos. 

Al ser frameworks con los que no había trabajado antes, mi primeros prompts fueron de investigación

Por ejemplo:
- "Qué diferencia a Nest.js de otros frameworks en el backend? Por qué es denominado un framework 'progresivo'?"
- "Qué estructura de directorios es la recomendada en para un proyecto? Dame un roadmap de módulos/tareas que debo seguir para completar un proyecto simple con una entidad"

También lo usé para agilizar procesos desarrollando los templates del html y css en el frontend.
Por ejemplo:
- "Desarrolla una tabla en angular que tenga un header, footer, y body con 3 columnas las cuales albergaran tarjetas de tareas para un tablero kanban. Utiliza tailwind para los estilos y sigue las mejores prácticas de angular que te mostraré a continuación..."

Me apoyé de archivos de prompts pre-curados, como el que provee angular en el directorio `proyect-name/.gemini/GEMINI.md`, y del sistema de importar código de gemini para mantener consistencia en las respuestas.

También lo usé para salir de estancamientos cuando el debuggeo a través de los mensajes de la consola dejaba de ser tan evidente. 
Un caso particular que puedo nombrar fue una dependencia circular entre el task.service del frontend y task.gateway

# Decisiones/supuestos y trade-offs
Durante el desarrollo tomé decisiones mayoritariamente a modo de aseurar el cumplimiento de los requisitos esenciales en el tiempo estipulado. Estas fueron:

- El kanban tendrá 1 solo tablero universal para todos los usuarios.
- Se usará tailwind3 en vez de tailwind4
- No se podrá reorganizar verticalmente las tareas en sus columnas
- No se implementará módulo de usuarios

Algunas de estas decisiones fueron tomadas por limitaciones propias y malas decisiones de diseño
Por ejemplo, usar tailwind3 fue porque no se aplicaban los estilos con tailwind4 y la solución parecía dificil de debuggear por lo que era más plaucible bajar a tailwind3 el cual funciona correctamente y ofrece todo lo necesario para un proyecto tan pequeño

No poder mover las tareas verticalmente fue un problema con el que me encontré ya avanzado en el proyecto por no haber considerado esto en la definición del modelo de tasks. De haber pensado en poner un id de posición en la columna en la entidad de task podría haber implementado lógica de reorganización en el drag'n'drop. El trade-off es una UX menos pulida y visualmente más tosca.

En conclusión, la gran parte de las decisiones fueron tomadas en base al tiempo y limitaciones técnicas, lo cual desemboca en un resultado final menos pulido y profesional.

# Conclusiones
Tuve un buen pasar con ambos frameworks, me pasieron muy ágiles y limpios. No tuve experiencia previa con ninguno y disfrute tanto de la documentación oficial como el desarrollo. 
Si tuviera que dar puntos que me parecieron interesantes a nivel personal:
- En Nest me pareció muy limpia y agradable la forma de desarrollar "sobre la marcha" integrando únicamente las herramientas que necesito para mi proyecto, sin tener un proyecto inicial ahogado en carpetas y módulos que no iba a terminar usando en algo tan simple como un crud. Lo sentí muy simple y poco verboso en todos los módulos, realmente escribí muy pocas lineas de código para todo el backend.
- En Angular sentí muy ordenado y limpio el sistema de módulos, mucho menos verboso y enredado que React. Al igual que Nest sentí que con el CLI ya tenía hecha la mayoría del trabajo hecha, simplemente tenia que añadir algo de lógica sencilla para que todo empiece a funcionar prácticamente sin problemas.

Los problemas que tuve durante el desarrollo fueron puramente limitaciones técnicas propias de la no experiencia con estos frameworks y falta de organización inicial. Siento que con uno o dos proyectos simplones más como este podría empezar a dar desarrollos decentes con estos frameworks. 
