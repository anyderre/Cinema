package com.example.Cinema.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by anyderre on 07/03/18.
 */
@Controller
public class PrincipalesController {
    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String paginaPrincipal() {
        return "index";
    }
    @RequestMapping(value = "/cine", method = RequestMethod.GET)
    public String getCine(){
        return "cine";
    }
    @RequestMapping(value = "/pelicula", method = RequestMethod.GET)
    public String getPelicula(){
        return "pelicula";
    }
    @RequestMapping(value = "/cartelera", method = RequestMethod.GET)
    public String getCartelera(){
        return "cartelera";
    }
    @RequestMapping(value = "/sala", method = RequestMethod.GET)
    public String getSala(){
        return "sala";
    }
    @RequestMapping(value = "/surcusal", method = RequestMethod.GET)
    public String getSurcusal(){
        return "surcusal";
    }
}
