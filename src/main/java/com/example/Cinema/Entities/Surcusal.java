package com.example.Cinema.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


/**
 * Created by anyderre on 07/03/18.
 */

@Table(name = "surcusal")
@Entity
@Data
public class Surcusal implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Size(max = 100, min = 3)
    private String ciudad;
    @Size(max = 100, min = 3)
    private String nombre;

    @ManyToOne(optional = false)
    @JoinColumn(name = "cine_id")
    private Cine cine;

    private boolean enabled=true;
}
