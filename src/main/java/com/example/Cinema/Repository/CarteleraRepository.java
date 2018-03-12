package com.example.Cinema.Repository;

import com.example.Cinema.Entities.Cartelera;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by anyderre on 07/03/18.
 */
@Repository
public interface CarteleraRepository extends JpaRepository<Cartelera, Long>{
    Cartelera save(Cartelera cartelera);
    Cartelera findById(long id);
    List<Cartelera>findAll();
    List<Cartelera> findAllByCineId(long id);
    List<Cartelera> findAllBySurcusalId(long id);

}
