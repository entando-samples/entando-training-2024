package com.entando.heroesms;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hero")
public class HeroController {

    @GetMapping
    public ResponseEntity<List<Hero>> getHeroes() {
        return ResponseEntity.ok(List.of(new Hero("SuperGianni", "PonteDiNona", "Puzza")));
    }
}
