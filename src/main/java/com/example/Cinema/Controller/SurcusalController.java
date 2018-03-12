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
import com.example.Cinema.Services.SalaServices;
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
public class SurcusalController {
    @Autowired
    private SurcusalRepository surcusalRepository;
    @Autowired
    private CineRepository cineRepository;
    @Autowired
    private SalaRepository salaRepository;

    @Autowired
    private CarteleraServices carteleraServices;

    @Autowired
    private SalaServices salaServices;

    @PostMapping("/surcusal/")
    public ResponseEntity<Surcusal> saveSurcusal(@Valid @RequestBody Surcusal surcusal, UriComponentsBuilder componentsBuilder){
        Surcusal currentSurcusal = new Surcusal();
        currentSurcusal.setNombre(surcusal.getNombre());
        currentSurcusal.setCiudad(surcusal.getCiudad());

        Cine currentCine= cineRepository.findById(surcusal.getCine().getId());
        currentSurcusal.setCine(currentCine);

        surcusalRepository.save(surcusal);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(componentsBuilder.path("/car/id").buildAndExpand(currentSurcusal.getId()).toUri());
        return new ResponseEntity<>(headers, HttpStatus.OK);
    }

    @DeleteMapping(value = "/surcusal/{id}")
    public ResponseEntity<Surcusal> deleteSurcusal(@PathVariable(value="id")long id){
       Surcusal surcusal= surcusalRepository.findById(id);

        if (surcusal==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        salaServices.deleteSalaBySurcusal(surcusal);
        carteleraServices.deleteCarteleraBySurcusal(surcusal);
        surcusalRepository.delete(surcusal);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping(value = "/surcusal/")
    public ResponseEntity <List<Surcusal>> getList(){
        List<Surcusal> surcusals = surcusalRepository.findAll();
        if (surcusals.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(surcusals, HttpStatus.OK);
    }
    @GetMapping(value = "/surcusal/cine/{id}")
    public ResponseEntity <List<Surcusal>> getList(@PathVariable(value = "id")long id){
        List<Surcusal> surcusals = surcusalRepository.findAllByCineId(id);
        if (surcusals.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(surcusals, HttpStatus.OK);
    }

    @PutMapping("/surcusal/{id}")
    public ResponseEntity<Surcusal> updateSurcusal(@Valid @RequestBody Surcusal surcusal, @PathVariable(value = "id")long id){
        if(surcusalRepository.findById(id)==null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       Surcusal currentSurcusal = surcusalRepository.findById(surcusal.getId());
       currentSurcusal.setCine(surcusal.getCine());
       currentSurcusal.setCiudad(surcusal.getCiudad());
       currentSurcusal.setNombre(surcusal.getNombre());
       surcusalRepository.save(currentSurcusal);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
