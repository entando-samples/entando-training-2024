package com.entando.heroms.controller;

import com.entando.heroms.model.HeroDto;
import com.entando.heroms.service.HeroService;
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
    public ResponseEntity<List<HeroDto>> getHeroes() {
        final List<HeroDto> heroes = this.heroService.getHeroes();
        return ResponseEntity.ok(heroes);
    }

    @PostMapping
    public ResponseEntity<HeroDto> createHero(@RequestBody HeroDto hero) {
        final HeroDto createdHero = this.heroService.createHero(hero);
        return ResponseEntity.ok(createdHero);
    }
}
