package com.example.Cinema.Controller;


import com.example.Cinema.Entities.Pelicula;
import com.example.Cinema.Repository.PeliculaRepository;

import com.example.Cinema.Services.PeliculaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by anyderre on 07/03/18.
 */
@RestController
@RequestMapping(value = "/api")
public class PeliculaController {
    @Autowired
    private PeliculaRepository peliculaRepository;
    @Autowired
    private PeliculaService peliculaService;
    @PostMapping("/pelicula/")
    public ResponseEntity<Pelicula> savePelicula(@Valid @RequestBody Pelicula pelicula, UriComponentsBuilder componentsBuilder){
        Pelicula currentPelicula = peliculaRepository.save(pelicula);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(componentsBuilder.path("/car/id").buildAndExpand(currentPelicula.getId()).toUri());
        return new ResponseEntity<>(headers, HttpStatus.OK);
    }

    @DeleteMapping(value = "/pelicula/{id}")
    public ResponseEntity<Pelicula> deletePelicula(@PathVariable(value="id")long id){
       Pelicula pelicula= peliculaRepository.findById(id);
        if (pelicula==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        peliculaService.deleteCartelleraDetalle(id);
        peliculaRepository.delete(pelicula);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping(value = "/pelicula/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity <List<Pelicula>> getList(){
        List<Pelicula> peliculas = peliculaRepository.findAll();
        if (peliculas.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(peliculas, HttpStatus.OK);
    }

    @PutMapping("/pelicula/{id}")
    public ResponseEntity<Pelicula> updatePelicula(@Valid @RequestBody Pelicula pelicula, @PathVariable(value = "id")long id){
        Pelicula currentPelicula = peliculaRepository.findById(id);
        if(currentPelicula==null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        currentPelicula.setDuracion(pelicula.getDuracion());
        currentPelicula.setNombre(pelicula.getNombre());
        currentPelicula.setTipo(pelicula.getTipo());
        currentPelicula.setAnio(pelicula.getAnio());
        peliculaRepository.save(currentPelicula);
        return new ResponseEntity<>(currentPelicula, HttpStatus.OK);
    }
}
