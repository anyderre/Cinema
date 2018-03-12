package com.example.Cinema.Controller;

import com.example.Cinema.Entities.Cartelera;
import com.example.Cinema.Entities.Cine;
import com.example.Cinema.Entities.Sala;
import com.example.Cinema.Entities.Surcusal;
import com.example.Cinema.Repository.CarteleraRepository;
import com.example.Cinema.Repository.CineRepository;
import com.example.Cinema.Repository.SalaRepository;
import com.example.Cinema.Repository.SurcusalRepository;
import com.example.Cinema.Services.CarteleraServices;
import com.example.Cinema.Services.SurcusalServices;
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
public class CineController {
    @Autowired
    private CineRepository cineRepository;
    @Autowired
    private SurcusalServices surcusalServices;
    @Autowired
    private CarteleraServices carteleraServices;

    @PostMapping("/cine/")
    public ResponseEntity<Cine> saveCine(@Valid @RequestBody Cine cine, UriComponentsBuilder componentsBuilder){
        Cine currentCine = cineRepository.save(cine);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(componentsBuilder.path("/car/id").buildAndExpand(currentCine.getId()).toUri());
        return new ResponseEntity<>(headers, HttpStatus.OK);
    }

    @DeleteMapping(value = "/cine/{id}")
    public ResponseEntity<Cine> deleteCine(@PathVariable(value="id")long id){
       Cine cine= cineRepository.findById(id);
        if (cine==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        surcusalServices.deleteSurcusalByCineId(cine);
        carteleraServices.deleteCarteleraByCine(cine);
        cineRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping(value = "/cine/")
    public ResponseEntity <List<Cine>> getList(){
        List<Cine> cines = cineRepository.findAll();
        if (cines.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(cines, HttpStatus.OK);
    }

    @PutMapping("/cine/{id}")
    public ResponseEntity<Cine> updateCine(@Valid @RequestBody Cine cine, @PathVariable(value = "id")long id){
        Cine cuurrentCine= cineRepository.findById(id);
        if(cuurrentCine==null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        cuurrentCine.setNombre(cine.getNombre());
        cineRepository.save(cuurrentCine);
        return new ResponseEntity<>(cuurrentCine, HttpStatus.OK);
    }
}
