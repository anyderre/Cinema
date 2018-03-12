package com.example.Cinema.Repository;

import com.example.Cinema.Entities.Surcusal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by anyderre on 07/03/18.
 */
@Repository
public interface SurcusalRepository extends JpaRepository<Surcusal, Long> {
    Surcusal save(Surcusal surcusal);
    Surcusal findById(long id);
    List<Surcusal> findAll();
    List<Surcusal> findAllByCineId(long id);
}
