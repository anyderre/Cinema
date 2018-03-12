package com.example.Cinema.Entities;


import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by anyderre on 07/03/18.
 */
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "id", scope = Cartelera.class)
@Entity
@Data
@Table(name = "cartelera")
public class Cartelera implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Date fechaInicio;
    private Date fechaFin;

    @ManyToOne(optional = false)
    @JoinColumn(name = "surcusal_id")
    private Surcusal surcusal;

    @ManyToOne(optional = false)
    @JoinColumn(name = "cine_id")
    private Cine cine;
    private boolean enabled=true;

}
