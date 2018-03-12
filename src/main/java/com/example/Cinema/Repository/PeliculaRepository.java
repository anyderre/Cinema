package com.example.Cinema.Repository;

import com.example.Cinema.Entities.Pelicula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by anyderre on 07/03/18.
 */
@Repository
public interface PeliculaRepository extends JpaRepository<Pelicula, Long> {
    Pelicula save(Pelicula pelicula);
    Pelicula findById(long id);
    List<Pelicula> findAll();
}
