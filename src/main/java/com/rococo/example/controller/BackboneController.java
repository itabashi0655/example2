package com.rococo.example.controller;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;

public class BackboneController extends Controller {

    @Override
    public Navigation run() throws Exception {
        return forward("Backbone.html");
    }
}
