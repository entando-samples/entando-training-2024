package com.entando.heroms.heroms.controller;

import com.entando.heroms.heroms.model.Hero;
import com.entando.heroms.heroms.service.HeroService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hero")
@RequiredArgsConstructor
public class HeroController {

    private final HeroService heroService;

    @GetMapping
    public ResponseEntity<List<Hero>> getHeroes() {
        final List<Hero> heroes = this.heroService.getHeroes();
        return ResponseEntity.ok(heroes);
    }

    @PostMapping
    public ResponseEntity<Hero> createHero(@RequestBody Hero hero) {
        final Hero createdHero = this.heroService.createHero(hero);
        return ResponseEntity.ok(createdHero);
    }
}
