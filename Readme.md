Objetivo: Definir una API para gestionar nuestro equipo Pokémon

#Acciones:
- Identificarnos
- Añadir un pokémon a nuestro equipo
- Eliminar un pokémons de nuestro equipo
- Consultar información de nuestro equipo
- Intercambiar el orden de nuestros pokémon

#REST Design:
- Añadir un pokémon: POST /team/pokemons
- Conmsultar Equipo: GET /team
- Eliminar un pokémon: DELETE /team/pokemons/:id
- Intercambiar el orden de nuestros pokémon: PUT /team
- Sistema de credenciales
