package com.example.Cinema.Services;

import com.example.Cinema.Entities.DetalleCartelera;
import com.example.Cinema.Entities.Sala;
import com.example.Cinema.Entities.Surcusal;
import com.example.Cinema.Repository.CarteleraDetalleRepository;
import com.example.Cinema.Repository.SalaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by anyderre on 09/03/18.
 */
@Service
public class SalaServices {
    @Autowired
    private SalaRepository salaRepository;
    @Autowired
    private CarteleraDetalleRepository detalleCarteleraRepository;


    public void deleteSalaBySurcusal(Surcusal surcusal){
        List<Sala> salas = salaRepository.findAllBySurcusalId(surcusal.getId());
        for(Sala sala:salas){
            for(DetalleCartelera detalleCartelera: detalleCarteleraRepository.findAllBySalaId(sala.getId())){
                detalleCarteleraRepository.delete(detalleCartelera);
            }
            salaRepository.delete(sala);
        }
    }
    public void deleteSala(Sala sala){

            for(DetalleCartelera detalleCartelera: detalleCarteleraRepository.findAllBySalaId(sala.getId())){
                detalleCarteleraRepository.delete(detalleCartelera);
            }
            salaRepository.delete(sala);

    }
}
