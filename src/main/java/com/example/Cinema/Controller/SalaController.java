package com.example.Cinema.Controller;

import com.example.Cinema.Entities.Cartelera;
import com.example.Cinema.Entities.DetalleCartelera;
import com.example.Cinema.Entities.Sala;
import com.example.Cinema.Entities.Surcusal;
import com.example.Cinema.Repository.CarteleraDetalleRepository;
import com.example.Cinema.Repository.CarteleraRepository;
import com.example.Cinema.Repository.SalaRepository;
import com.example.Cinema.Repository.SurcusalRepository;
import com.example.Cinema.Services.SalaServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import sun.util.resources.cldr.rm.CurrencyNames_rm;

import javax.swing.plaf.basic.BasicSliderUI;
import javax.validation.Valid;
import java.util.List;

/**
 * Created by anyderre on 07/03/18.
 */
@RestController
@RequestMapping(value = "/api")
public class SalaController {
    @Autowired
    private SalaRepository salaRepository;
    @Autowired
    private SurcusalRepository surcusalRepository;
    @Autowired
    private SalaServices  salaServices;

    @PostMapping(value = "/sala/")
    public ResponseEntity<Sala> saveSala(@Valid @RequestBody Sala sala, UriComponentsBuilder componentsBuilder){
        Sala currentSala= salaRepository.save(sala);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(componentsBuilder.path("/api/sala/id").buildAndExpand(currentSala.getId()).toUri());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/sala/{id}")
    public ResponseEntity<Sala> deleteSala(@PathVariable (value="id")long id){
        Sala sala = salaRepository.findById(id);
        if (sala==null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        salaServices.deleteSala(sala);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping(value = "/sala/")
    public ResponseEntity <List<Sala>> getList(){
        List<Sala> salas = salaRepository.findAll();
        if (salas.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(salas, HttpStatus.OK);
    }
    @GetMapping(value = "/sala/surcusal/{id}")
    public ResponseEntity <List<Sala>> getListBySurcusal(@PathVariable(value = "id")long id){
        List<Sala> salas = salaRepository.findAllBySurcusalId(id);
        if (salas.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(salas, HttpStatus.OK);
    }

    @PutMapping("/sala/{id}")
    public ResponseEntity<Sala> updateSala(@Valid @RequestBody Sala sala, @PathVariable(value = "id")long id){
         Sala currentSala = salaRepository.findById(id);
        if(currentSala==null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        currentSala.setNombre(sala.getNombre());
        currentSala.setSurcusal(sala.getSurcusal());
        salaRepository.save(currentSala);
        return new ResponseEntity<>(currentSala, HttpStatus.OK);
    }
}
