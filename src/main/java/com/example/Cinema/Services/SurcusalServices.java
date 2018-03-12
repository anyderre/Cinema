package com.example.Cinema.Services;

import com.example.Cinema.Entities.Cine;
import com.example.Cinema.Entities.Surcusal;
import com.example.Cinema.Repository.CarteleraRepository;
import com.example.Cinema.Repository.SalaRepository;
import com.example.Cinema.Repository.SurcusalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by anyderre on 09/03/18.
 */
@Service
public class SurcusalServices {
    @Autowired
    private SurcusalRepository surcusalRepository;
    @Autowired
    private CarteleraRepository carteleraRepository;
    @Autowired
    private SalaRepository salaRepository;
    @Autowired
    private  SalaServices salaServices;
    @Autowired
    private CarteleraServices carteleraServices;

    public void deleteSurcusalByCineId(Cine cine){
        List<Surcusal> surcusals = surcusalRepository.findAllByCineId(cine.getId());
        for(Surcusal surcusal: surcusals){
            salaServices.deleteSalaBySurcusal(surcusal);
            carteleraServices.deleteCarteleraBySurcusal(surcusal);
            surcusalRepository.delete(surcusal);
        }
    }

}
