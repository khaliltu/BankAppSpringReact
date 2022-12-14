package tn.iit.bank.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import tn.iit.bank.entities.Client;
import tn.iit.bank.services.ClientService;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/clients")
public class ClientController {

	private final ClientService clientService;
	
	@GetMapping
	public List<Client> getAll() {
		return clientService.getAll();
	}
	
	@GetMapping("/{cin}")
	public ResponseEntity<Client> read(@PathVariable String cin) {
		Client client;
		try {
			client = clientService.getClientById(cin);
			return ResponseEntity.ok(client);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

	}

	@GetMapping("/search")
	public List<Client> searchByPrefix(@RequestParam String prefix){
		return clientService.getByNameStartingWith(prefix);
	}

	@PostMapping
	public ResponseEntity<Client> create(@RequestBody Client client) {
		var newClient = new Client();
		if (!clientService.exist(client.getCin())) {
			newClient = clientService.save(client);
			return ResponseEntity.ok(newClient);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}

	@PutMapping
	public ResponseEntity<Client> update(@RequestBody Client client) {
		var newClient = new Client();
		if (clientService.exist(client.getCin())) {
			newClient = clientService.save(client);
			return ResponseEntity.ok(newClient);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/delete/{cin}")
	public List<Client> delete(@PathVariable String cin) {
		clientService.delete(cin);
		return clientService.getAll();
	}
	
}
